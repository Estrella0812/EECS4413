HOW TO RUN APPLICATION

Ensure nothing is already running on ports 3000 and 8080

On a terminal:
cd server
docker compose down -v
docker compose up --build
Note: You may need to create a Stripe account to test the payment workflow

On a new seperate terminal:
cd client
npm run dev