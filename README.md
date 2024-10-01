# X-Clone App

An X-clone application built with modern React technologies, enabling users to interact through posts, follows, and media uploads.

## 🚀 Technologies

- **Frontend:** React, Vite
- **Data Management:** React Query (Infinite Queries & Mutations)
- **Authentication:** Custom Auth Provider hook using JWT
- **Styling:** TailwindCSS

## 🌟 Features

- **User Authentication:** Secure login and registration with JWT.
- **Infinite Feed:** Smooth, endless scrolling of posts using React Query’s InfiniteQuery.
- **Post Creation:** Users can create, upload images and GIFs, and delete their posts.
- **Follow System:** Follow and unfollow other users to customize your feed.
- **Real-time Updates:** Instant UI updates with React Query’s useMutation.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## 🔧 Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/SamuelFerfort/x-clone-frontend.git
   cd x-clone-frontend

   ```

2. **Install Dependencies**

   ```bash
   npm install

   ```

3. **Configure Environment Variables:** Create a .env file in the root directory and add the following variables:

   ```bash
   VITE_API_URL=your_api_url_here
   VITE_TOKEN=your_token_here

   ```
4. **Run the Development Server:**
   
   ```bash

   npm run dev

   ```

## 🎯 Goals

Designed as a portfolio project to demonstrate proficiency in React, state management with React Query, custom hooks for authentication, and building  interactive user interfaces.