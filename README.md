# Blue Save (Nautikara) Backend

This is the backend API for Blue Save (Nautikara), an environmental platform for reporting, news, events, and donations. Built with Node.js, TypeScript, Express, Prisma, and PostgreSQL.

## Features

- **User Authentication**: Register and log in with JWT tokens. Registration immediately returns access and refresh tokens; email verification is not required.
- **Reports**: Submit and view environmental reports with media uploads.
- **News**: Browse news articles by category.
- **Events**: View and register for environmental events.
- **Donations**: Dummy payments immediately succeed and record the donation. No real money is charged and no payment gateway is used.
- **Rate Limiting**: Prevent abuse on sensitive endpoints.
- **Scheduled Jobs**: Automatic report status updates.

## Tech Stack

- Node.js, Express, TypeScript
- PostgreSQL, Prisma ORM
- Passport.js (JWT)
- Local disk storage (user-uploaded report media)

## Getting Started

### Prerequisites

- Node.js & npm
- PostgreSQL database

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

- `POST /donation` - Record a successful dummy donation (requires authentication)

### Dummy donations

Send `POST /api/v1/donation` with a bearer access token and a JSON body:

```json
{ "amount": 10000 }
```

The amount must be positive, have at most two decimal places, and be between `0.01` and `99999999.99`. Phone numbers are not required and no additional fee is added.

Successful requests return HTTP 200 after saving the donation:

```json
{
  "message": "Donation successful",
  "transaction": {
    "id": "donation-id",
    "orderId": "ORDER-generated-uuid",
    "amount": 10000,
    "status": "success",
    "dummy": true
  }
}
```

There is no checkout token, redirect URL, or webhook. Clients should display success directly. Authentication, validation, and database errors still return errors.

---
