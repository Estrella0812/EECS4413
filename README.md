HOW TO RUN APPLICATION

Ensure nothing is already running on ports 3000 and 8080

On a terminal:
cd server
docker compose down -v
docker compose up --build

On a new seperate terminal:
cd client
npm run dev