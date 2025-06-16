import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(express.json())

app.get('/', (_req, res) => {
    res.status(200).json({ message: "Hola movieAPI 🚀" })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})