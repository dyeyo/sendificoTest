import express, { Express } from "express";
import dotenv from "dotenv";

import routePokemons from "./routers/pokemons.routes";

dotenv.config();

const app: Express = express();


app.use(express.json());

// Rutas
app.use("/api/pokemons", routePokemons);

const PORT: number = parseInt(process.env.PORT || "3000", 10);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
