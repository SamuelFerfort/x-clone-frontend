# X-Clone App

<p align="center">
  <img src="https://res.cloudinary.com/dy0av590l/image/upload/v1729662683/Screenshot_from_2024-10-03_07-17-41_lfnp8n.png" alt="X-clone screenshot" width="800"/>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite Badge"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Badge"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS Badge"/>
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="React Query Badge"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma Badge"/>
  <img src="https://img.shields.io/badge/JWT-000?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT Badge"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL Badge"/>
</p>

An X-clone application built with modern React technologies, enabling users to interact through posts, follows, and media uploads.

## 🔗 Links

- **Live Demo:** [https://x-social-media.vercel.app](https://x-social-media.vercel.app)
- **Backend Repository:** [https://github.com/SamuelFerfort/x-clone-backend](https://github.com/SamuelFerfort/x-clone-backend)

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

Designed as a portfolio project to demonstrate proficiency in React, state management with React Query, custom hooks for authentication, and building interactive user interfaces.
