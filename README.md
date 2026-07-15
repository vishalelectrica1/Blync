# Blync - E-Commerce Platform

Blync is a full-stack e-commerce platform built using the MERN stack. It provides a complete digital storefront allowing users to browse products, add them to a shopping cart, and securely checkout. It also features an administrative dashboard for inventory and order management.

## 🚀 Features

- **User Authentication:** Secure login and registration using JSON Web Tokens (JWT) and bcrypt password hashing.
- **Product Catalog:** Browse products by category with detailed views.
- **Shopping Cart:** Persistent shopping cart state managed via Redux Toolkit.
- **Secure Checkout:** Integrated with the Stripe API for PCI-compliant payment processing.
- **Order Tracking:** Users can view their order history and current shipping status.
- **Admin Dashboard:** Administrators can add, edit, and delete products, as well as manage user orders.
- **Image Hosting:** Product images are uploaded and served seamlessly via Cloudinary.
- **Email Notifications:** Automated welcome emails and order confirmations using Nodemailer.

## 🛠️ Technology Stack

**Frontend:**
- React.js (Single Page Application)
- React Router DOM (Routing)
- Redux Toolkit & Context API (State Management)
- Vanilla CSS (Styling)

**Backend:**
- Node.js & Express.js (RESTful API)
- MongoDB & Mongoose (Database & ODM)
- JWT (Authentication)
- Multer (File Upload Parsing)

**Third-Party Services:**
- Stripe (Payments)
- Cloudinary (Image CDN)

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vishalelectrica1/Blync.git
   cd Blync
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Variables:**
   Create a `.env` file in the `backend` directory and add the following variables:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:3000
   STRIPE_SECRET_KEY=your_stripe_secret
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_HOST=smtp.your-email-provider.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

5. **Run the Application (Development Mode):**
   Open two terminal windows.
   
   Terminal 1 (Backend):
   ```bash
   cd backend
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm start
   ```

## 📝 License

This project is licensed under the MIT License.
