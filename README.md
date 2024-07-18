# 📢 Campus Sync

Campus Sync is an AI-based student and faculty management system built with Next.js, MongoDB, and other technologies to streamline educational processes.

## 🚀 Features

- **User Authentication**: Secure authentication using bcryptjs for hashing passwords and JWT for session management.
- **Role-based Access**: Different access levels for students, faculty, and administrators.
- **Course Management**: Faculty can create, edit, and manage courses. They can upload videos, add or remove students, and access student results.
- **Dynamic AI Quizzes**: AI-powered quizzes adjust question difficulty based on student responses, providing adaptive learning experiences.
- **Student Enrollment**: Colleges can manage student enrollments and profiles, including adding them to courses and tracking academic progress.
- **Stripe Integration**: Subscription-based plans (Lite, Standard, Premium) with varying access to AI quizzes and additional features, managed through Stripe for secure payments.
- **Community Forums**: Students can join communities to share thoughts and collaborate on academic and extracurricular topics.
- **Chat Functionality**: Real-time chat among students for group projects, study groups, or general communication.
- **Responsive Design**: Utilizes Tailwind CSS for a modern, responsive user interface.
- **State Management**: Zustand for efficient state management within React components.

## 🛠️ Technologies Used

- **Next.js**: React framework for server-side rendering and frontend logic.
- **MongoDB**: NoSQL database for storing user data, course details, quiz results, and community interactions.
- **Express.js**: Minimalist web framework for handling backend API requests.
- **Node.js**: JavaScript runtime for server-side operations.
- **Tailwind CSS**: Utility-first CSS framework for styling components.
- **Zustand**: State management library for React applications.
- **Iron Session**: Secure session management for user authentication.
- **Stripe**: Payment processing platform for subscription management.

## ⬇️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ramzanshareef/campus-sync-dev.git
   cd campus-sync
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a .env file in the root directory based on .env.example.
   - Configure environment variables required for MongoDB connection, JWT secret, Stripe API keys, etc.
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="<your_clerk_publishable_key>"
CLERK_SECRET_KEY="<your_clerk_secret_key>"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
WEBHOOK_SECRET="<your_webhook_secret>"
DB_URL="<your_mongodb_connection_string>"
STRIPE_SECRET_KEY="<your_stripe_secret_key>"
STRIPE_WEBHOOK_SECRET="<your_stripe_webhook_secret>"
NEXT_PUBLIC_CLOUDINARY_API_KEY="<your_cloudinary_api_key>"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<your_cloudinary_cloud_name>"
CLOUDINARY_API_SECRET="<your_cloudinary_api_secret>"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
JWT_SECRET="<your_jwt_secret>"
SESSION_SECRET="<your_session_secret>"
```
## 📝 Usage
1. **User Registration**: Students and faculty can sign up using their email addresses.
2. **Subscription Plans**: Choose from Lite, Standard, or Premium plans with varying access to AI quizzes and other features, managed through Stripe payments.
3. **Course Management**: Faculty can create new courses, upload videos, and manage student enrollments.
4. **Quiz Experience**: Students can attempt AI-powered quizzes where question difficulty adapts based on their responses.
5. **Community Interaction**: Join and participate in community forums to discuss academic topics and collaborate with peers.
6. **Real-time Chat**: Communicate with other students in real-time for project collaboration and study groups.
7. **Profile Management**: Update user profiles and view academic progress and quiz results.

## 🤝 Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## 👉 Contact

For any inquiries or feedback, please reach out to:
- **Name**: Mohd Ramzan Shareef
- **Email**: mail.ramzanshareef@gmail.com
- **GitHub**: [ramzanshareef](https://github.com/ramzanshareef)
