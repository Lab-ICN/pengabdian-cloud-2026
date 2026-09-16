# Blue Save (Nautikara) Backend

This is the backend API for Blue Save (Nautikara), an environmental platform for reporting, news, events, and donations. Built with Node.js, TypeScript, Express, Prisma, and PostgreSQL.

## Features

- **User Authentication**: Register, login, Google OAuth, OTP verification, password reset.
- **Reports**: Submit and view environmental reports with media uploads.
- **News**: Browse news articles by category.
- **Events**: View and register for environmental events.
- **Donations**: Make donations via Midtrans payment gateway.
- **Rate Limiting**: Prevent abuse on sensitive endpoints.
- **Scheduled Jobs**: Automatic cleanup of unverified users and report status updates.

## Tech Stack

- Node.js, Express, TypeScript
- PostgreSQL, Prisma ORM
- Passport.js (JWT & Google OAuth)
- Supabase (media storage)
- Midtrans (payment gateway)
- Nodemailer (email service)

## Getting Started

### Prerequisites

- Node.js & npm
- PostgreSQL database
- [Midtrans](https://midtrans.com/) account
- [Supabase](https://supabase.com/) project
- Google OAuth credentials

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-username/blue-save-be.git
   cd blue-save-be
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and configure:

   ```
   DATABASE_URL=your_postgres_url
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=your_google_callback_url
   MIDTRANS_SERVER_KEY=your_midtrans_server_key
   MIDTRANS_CLIENT_KEY=your_midtrans_client_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   RESET_PASSWORD_URL=https://your-frontend/reset-password
   REDIRECT_URL=https://your-frontend/auth/callback
   ```

4. **Run database migrations**

   ```sh
   npx prisma migrate deploy
   ```

5. **Seed the database (optional)**

   ```sh
   npx ts-node prisma/seeders/reportSeeder.ts
   npx ts-node prisma/seeders/newsSeeder.ts
   npx ts-node prisma/seeders/eventSeeder.ts
   ```

6. **Start the development server**
   ```sh
   npm run dev
   ```

## API Endpoints

All endpoints are prefixed with `/api/v1`.

- `POST /auth/register` - Register a new user
- `POST /auth/verify-otp` - Verify OTP
- `POST /auth/login` - Login
- `GET /auth/google` - Google OAuth login
- `POST /auth/refresh-token` - Refresh JWT token
- `POST /auth/logout` - Logout
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password/:resetToken` - Reset password

- `POST /reports` - Create a report (requires authentication)
- `GET /reports/user-reports` - Get reports by user (requires authentication)

- `GET /news` - Get all news
- `GET /news/:id` - Get news by ID

- `GET /events` - Get all events (requires authentication)
- `GET /events/:eventId` - Get event by ID (requires authentication)
- `POST /events/register/:eventId` - Register for event (requires authentication)

- `POST /donation` - Create a donation (requires authentication)
- `POST /donation/webhook` - Midtrans webhook

---
