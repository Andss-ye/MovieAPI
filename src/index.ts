import express from 'express';
import dotenv from 'dotenv';

// Importing middlewares
import errorHandler from './middlewares/errorHandler';

// Importing routes
import userRoutes from './routes/user.routes';
import movieRoutes from './routes/movie.routes';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
    res.status(200).json({ message: "Hola movieAPI 🚀" });
})

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes)

// middleware for error managing
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})