import express, { Express } from "express";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "./swaggerOptions";

import routePokemons from "./routers/pokemons.routes";

dotenv.config();

const app: Express = express();


app.use(express.json());
const specs = swaggerJsDoc(options);

// Rutas
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/api/pokemons", routePokemons);
const PORT: number = parseInt(process.env.PORT || "3000", 10);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
