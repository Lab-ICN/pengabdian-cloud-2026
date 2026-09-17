# Blue Save (Nautikara) Backend

This is the backend API for Blue Save (Nautikara), an environmental platform for reporting, news, events, and donations. Built with Node.js, TypeScript, Express, Prisma, and PostgreSQL.

## Features

- **User Authentication**: Register and log in with JWT tokens. Registration immediately returns access and refresh tokens; email verification is not required.
- **Reports**: Submit and view environmental reports with media uploads.
- **News**: Browse news articles by category.
- **Events**: View and register for environmental events.
- **Donations**: Make donations via Midtrans payment gateway.
- **Rate Limiting**: Prevent abuse on sensitive endpoints.
- **Scheduled Jobs**: Automatic report status updates.

## Tech Stack

- Node.js, Express, TypeScript
- PostgreSQL, Prisma ORM
- Passport.js (JWT)
- Local disk storage (user-uploaded report media)
- Midtrans (payment gateway)

## Getting Started

### Prerequisites

- Node.js & npm
- PostgreSQL database
- [Midtrans](https://midtrans.com/) account

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
   MIDTRANS_SERVER_KEY=your_midtrans_server_key
   MIDTRANS_CLIENT_KEY=your_midtrans_client_key
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

- `POST /auth/register` - Register a new user and receive access and refresh tokens
- `POST /auth/login` - Login
- `POST /auth/refresh-token` - Refresh JWT token
- `POST /auth/logout` - Logout

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
