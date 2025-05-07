# Sublinks

Miniature crypto experiences helping creators on X monetise their content without switching platforms.

[ [Website](https://sublinks.fun) ] [ [Demo Video](https://youtu.be/WfqGo_7xme0) ] [ [X/Twitter](https://x.com/sublinks_) ] [ [ Deck ](https://www.canva.com/design/DAGTBd9Gknk/LuUzsjIrlNJtZMy06PMpSg/view?utm_content=DAGTBd9Gknk&utm_campaign=designshare&utm_medium=link&utm_source=editor#1)]

<img width="1126" alt="Image" src="https://github.com/user-attachments/assets/94dea9c9-07b7-4b77-b779-ccddb769a2f9" />

Sublinks is a decentralised solution built on Solana which utilises the power of BlockChain Links (Blinks) to help creators post premium content right within Twitter. These posts contain premium content which is accesible only after subscribing or purchasing a particular post, paying via crypto.

## Example:

<img width="1461" alt="Image" src="https://github.com/user-attachments/assets/553cb767-de93-4557-b346-28929c239f8a" />

## Tech Stack

### Frontend

- React 19 with TypeScript
- Civic Auth for authentication
- Vite as build tool
- TailwindCSS for styling
- Solana Web3.js for blockchain integration
- React Query for data fetching
- Firebase for storage bucket

### Backend

- Node.js with Express
- TypeScript
- MongoDB with Mongoose

## Project Structure

```
sublinks/
├── app/                # Frontend React application
├── backend/            # Node.js/Express backend server
├── action/             # Solana Action
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Solana CLI tools
- Yarn or npm package manager

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/HD-Delta-H/sublinks
cd sublinks
```

2. Install frontend dependencies:

```bash
cd app
npm install
```

3. Install backend dependencies:

```bash
cd ../backend
yarn install
```

4. Set up environment variables:

   - Create `.env` file in the backend directory with:
     ```
     MONGODB_URI=your_mongodb_uri
     ```
   - Create `.env` file in the app directory with:
     ```
     VITE_API_URL=http://localhost:8080
     VITE_FIREBASE_CONFIG=your_firebase_config
     ```

5. Start the development servers:

   Backend:

   ```bash
   cd backend
   yarn dev
   ```

   Frontend:

   ```bash
   cd app
   npm run dev
   ```

The application should now be running at:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Building for Production

1. Build the frontend:

```bash
cd app
npm run build
```

2. Build the backend:

```bash
cd backend
yarn build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
