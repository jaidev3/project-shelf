# Project Shelf

A modern portfolio application for designers, developers, and writers to create dynamic portfolios with modular case studies.

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Analytics**: Firebase Analytics
- **Form Management**: React Hook Form with Zod validation
- **UI Components**: Custom components with HeroUI
- **Animation**: Framer Motion
- **Toast Notifications**: React Hot Toast

## ✨ Features

- Authentication system with email/password login
- User profile management
- Portfolio builder with case study modules
- Theme customization engine
- Media management for projects
- Analytics dashboard
- Responsive design

## 🔐 Authentication Flow

The application uses Firebase Authentication with the following flow:

1. User registers with email/password or Google OAuth
2. User profile is created in Firestore upon registration
3. Login credentials are validated against Firebase Auth
4. Auth state is managed through React Context API
5. Protected routes redirect unauthenticated users to login
6. User session persists across browser sessions

## 🏗️ Project Structure

```
src/
├── apis/              # Firebase API integrations
├── components/        # Reusable UI components
├── contexts/          # React context providers (auth, theme)
├── hooks/             # Custom React hooks
├── lib/               # Firebase configuration
├── pages/             # Page components
├── routes/            # Route configuration
├── styles/            # Global styles
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
```

## 🛠️ Setup Guide

### Prerequisites

- Node.js (v20+)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/project-shelf.git
   cd project-shelf
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Firebase configuration

   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and Google sign-in methods
3. Create a Firestore database and configure security rules
4. Set up Firebase Storage for media uploads
5. Configure Firebase Hosting for deployment

## 📦 Build and Deployment

Build the application for production:

```bash
npm run build
```

Deploy to Firebase Hosting:

```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

## 📚 Development Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com/en/main)

## 📋 Project Status

See [PROJECT_PLAN.md](PROJECT_PLAN.md) for detailed implementation status.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
