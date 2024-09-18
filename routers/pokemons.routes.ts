import { Router } from "express";

import {
    getListPokemons,
    getPokemonWithType,
    getOnePokemon,
  } from "../controllers/pokemosController";
  
const router = Router();

router.get("/", getListPokemons);
router.get("/:id", getOnePokemon);
router.get("/type/:id", getPokemonWithType);

export default router;
