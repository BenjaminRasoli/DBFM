# DBFM (Database for Movies)

DBFM (Database for Movies) is a movie web application where users can signup, log in, and manage a list of their favorite movies and TV shows. The app allows users to add movies or series to their favorite list and access them on any device by logging in.

## Live Preview

Link: [dbfm.vercel.app](https://dbfm.vercel.app/)

## Features

- 🔐 **Authentication**: Users can sign up, log in, using Firebase Authentication.
- 🗃 **Favorite Movies/Series List**: Users can add movies and series to their favorite list, and the list is saved in Firebase.
- 🌐 **Cross-Device Sync**: Users can access their favorite movies across devices by logging into their account.
- 🚀 **React**: A fast and responsive user interface built with React.
- 🎬 **TMDb API**: Fetches the latest movies and TV shows from The Movie Database (TMDb) API to populate the movie data.

## Tech Stack

- **Frontend**: React
- **Backend**: Firebase Firestore and Firebase Authentication
- **API**: TMDb API for movie data
- **Styling**: CSS
- **Deployment**: Vercel Hosting

## Installation

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **Firebase project setup** (see below for details)
- **TMDb API key** (see below for details)

### Steps

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/dbfm.git
    cd dbfm
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Configure Firebase**:

    - Go to the Firebase Console.
    - Create a new project if you don’t have one.
    - Enable Firebase Authentication with Email/Password.
    - Set up Firestore database.
    - Copy your Firebase configuration settings.

4. **Set up TMDb API**:

    - Create a free account at [TMDb](https://www.themoviedb.org/).
    - Obtain an API key to fetch movie data.

5. **Create a `.env` file** to configure your Firebase and TMDb credentials:

    ```bash
    REACT_APP_FIREBASE_APIKEY=your_api_key
    REACT_APP_AUTH_DOMAIN=your_auth_domain
    REACT_APP_PROJECT_ID=your_project_id
    REACT_APP_STORAGE_BUCKET=your_storage_bucket
    REACT_APP_MESSAGE_SENDER_ID=your_messaging_sender_id
    REACT_APP_APP_ID=your_app_id

    REACT_APP_APIKEY=your_tmdb_api_key
    ```

6. **Run the development server**:

    ```bash
    npm run dev
    ```

7. **Open your browser** and navigate to:

    ```bash
    http://localhost:3000
    ```

### Scripts

- `npm run dev` - Start the development server.
- `npm run build` - Build the application for production.
- `npm start` - Start the production server.