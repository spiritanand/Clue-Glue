# ClueGlue

Self-hostable customer boards for product feedback and feature requests.

## Features

### User View

- **Feature Requests:** Submit new feature requests and suggestions.
- **Roadmap Tracking:** Monitor the progress of feature requests through a roadmap table view.
- **Progress Updates:** Stay informed about the status of submitted features.

### Admin View

- **Feature Management:** Oversee and update the status of feature requests.
- **Release Posts:** Publish updates to announce upcoming feature releases.
- **Dashboard:** Manage and review all feature requests and user feedback in one place.

## Tech Stack

- **Next.js:** Framework for building server-rendered React applications.
- **NextAuth.js:** Authentication solution for secure sign-in and user management.
- **Drizzle ORM:** ORM for database interactions and schema management.
- **Tailwind CSS - Shadcn:** Utility-first CSS framework for custom styling.
- **tRPC:** Type-safe API communication between client and server.

## Usage

- **Admin Users:** Log in to manage feature requests, update statuses, and release posts.
- **Regular Users:** Create feature requests and track their progress on the roadmap.

## Self Host or Local Setup

1. Clone the repository to your local machine:

```bash
git https://github.com/spiritanand/Clue-Glue 
cd Clue-Glue
```

2. Copy .env.example to .env and update the environment variables:

```bash
cp .env.example .env
```

3. Setup google-oauth credentials and a Postgres database

4. Host the app on
   Vercel/Netlify/Dockerize - [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)

We hope it helps you gather valuable feedback and make informed decisions on feature
development.