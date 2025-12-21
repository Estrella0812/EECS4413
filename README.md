# HOW TO RUN APPLICATION

Ensure nothing is already running on ports 3000 and 8080.

## Backend
Install [Docker Engine](https://docs.docker.com/engine/install/) (Linux only), or [Docker Desktop](https://docs.docker.com/desktop/) (Linux, MacOS, Windows).

On a terminal:
`cd server`
Create a `.env` file with the following:
```
DB_ROOT_PASSWORD=
DB_PASSWORD=
DB_USER=
DB_NAME=
DB_URL=jdbc:mysql://mysql:3306/db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&characterEncoding=utf8
JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
IMAGE_PATH=/app/images
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_API_URL=http://localhost:8080

FRONTEND_ORIGIN=http://localhost:3000
```
Credientials can be configured by the developer to be anything desired.

Note: You may need to create a Stripe account to test the payment workflow.
Follow these instructions to [activate an account](https://docs.stripe.com/get-started/account), [obtain API keys](https://docs.stripe.com/keys#obtain-api-keys),
and retrieve a [webhook secret](https://docs.stripe.com/webhooks/signature).

To start the app: `docker compose up --build`.

Restarting: `docker compose down -v`.

## Frontend
Install [node.js](https://nodejs.org/en/download).

On a new seperate terminal:
`cd client`

Create a `.env` file with the following:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_API_URL=http://localhost:8080
```
and fill out the stripe public  key after obtaining it by following the instructions in the backend section.

Install all the necessary dependencies by running the following command:
```
npm install
```

Finally, run `npm run dev`.
