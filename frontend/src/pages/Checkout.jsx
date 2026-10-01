import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Inner checkout form component utilizing Stripe Hooks
const CheckoutForm = ({ address, setAddress }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(cartItems);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Online');
  
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    if (paymentMethod === 'Online') {
      if (!stripe || !elements) {
        setIsProcessing(false);
        return;
      }
      
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: address.fullName,
              email: user.email,
              address: {
                city: address.city,
                country: 'IN',
                line1: address.street,
                postal_code: address.postalCode,
              }
            }
          }
        },
        redirect: "if_required"
      });

      if (error) {
        setErrorMessage(error.message);
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        saveOrder(paymentIntent.id, 'Stripe');
      } else {
        setErrorMessage("Payment failed or requires further action");
        setIsProcessing(false);
      }
    } else {
      saveOrder('COD', 'COD');
    }
  };

const saveOrder = async (paymentId, method) => {
  try {
    const saveOrderRes = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: totalPrice,
        address,
        paymentId,
        paymentMethod: method,
      }),
    });

    if (!saveOrderRes.ok) {
      const err = await saveOrderRes.json();
      throw new Error(err.message || "Failed to save order.");
    }

    // Update all products simultaneously
    await Promise.all(
      cartItems.map(async (item) => {
        const preQuantityRes = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${item.productId}`);
        const product = await preQuantityRes.json();

        const newQuantity = product.stock - item.qty;

        const updateRes = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${item.productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            stock: newQuantity,
          }),
        });

        if (!updateRes.ok) {
          throw new Error(`Failed to update stock for ${item.productId}`);
        }
      })
    );

    dispatch(clearCart());
    navigate("/ordersuccess");

  } catch (err) {
    console.error(err);
    setErrorMessage(err.message);
    setIsProcessing(false);
  }
};
  return (
    <form onSubmit={handleSubmit} className="shipping-form">
      <h3>Shipping Address</h3>
      <input type="text" placeholder="Full Name" required value={address.fullName} onChange={(e) => setAddress({...address, fullName: e.target.value})} />
      <input type="text" placeholder="Street" required value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />
      <input type="text" placeholder="City" required value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
      <input type="text" placeholder="Postal Code" required value={address.postalCode} onChange={(e) => setAddress({...address, postalCode: e.target.value})} />
      <input type="text" placeholder="Country" required value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})} />
      
      <h3 style={{ marginTop: '20px', marginBottom: '15px' }}>Payment Details</h3>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '15px', cursor: 'pointer' }}>
          <input type="radio" value="Online" checked={paymentMethod === 'Online'} onChange={(e) => setPaymentMethod(e.target.value)} /> Online Payment
        </label>
        <label style={{ cursor: 'pointer' }}>
          <input type="radio" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} /> Cash on Delivery
        </label>
      </div>

      {paymentMethod === 'Online' && (
        <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '20px', minHeight: '200px' }}>
          <PaymentElement />
        </div>
      )}

      {errorMessage && <div style={{ color: 'red', marginBottom: '15px' }}>{errorMessage}</div>}

      <div className="checkout-summary">
        <h4>Total to Pay: ₹{totalPrice.toFixed(2)}</h4>
        <button type="submit" className="btn" disabled={isProcessing || (paymentMethod === 'Online' && (!stripe || !elements))}>
          {isProcessing ? "Processing..." : (paymentMethod === 'Online' ? "Pay Now" : "Place Order")}
        </button>
      </div>
    </form>
  );
};

const Checkout = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: ''
  });

  useEffect(() => {
    // 1. Fetch Stripe Publishable Key
    fetch(`${process.env.REACT_APP_API_URL}/api/payment/config`)
      .then(res => res.json())
      .then(data => {
        if (data.publishableKey) {
          setStripePromise(loadStripe(data.publishableKey));
        }
      })
      .catch(err => console.error("Error loading stripe key", err));

    // 2. Fetch Payment Intent Client Secret
    if (totalPrice > 0) {
      fetch(`${process.env.REACT_APP_API_URL}/api/payment/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice })
      })
        .then(res => res.json())
        .then(data => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        })
        .catch(err => console.error("Error creating payment intent", err));
    }
  }, [totalPrice]);

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        {stripePromise && clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm address={address} setAddress={setAddress} />
          </Elements>
        ) : (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            {totalPrice === 0 ? "Your cart is empty." : "Initializing secure payment gateway..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
