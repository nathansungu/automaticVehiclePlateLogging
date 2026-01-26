MutAutomaticVehicleLogging Backend

This is the backend for the MutAutomaticVehicleLogging system, built with Node.js, TypeScript, Prisma, and PostgreSQL.

Prerequisites

Make sure you have installed:

Node.js (v18+ recommended)

npm (comes with Node.js)

PostgreSQL (v14+ recommended)

Git

Setup Instructions
1. Clone the repository
git clone <REPO_URL>
cd mutAutomaticVehicleLogging/backend

2. Install dependencies
npm install

3. Configure environment variables

Create a .env file in the project root (same level as package.json) and add your database URL:

DATABASE_URL="postgresql://username:password@localhost:5432/db"


Adjust the username, password, and database name as needed.

4. Generate Prisma client
npx prisma generate


This will create the Prisma Client in ./src/generated.

5. Run database migrations
npx prisma migrate dev


This will create the tables in your PostgreSQL database according to schema.prisma.

6. Start the development server
npm run dev


This will start the backend in development mode with hot reload.