import { Request, Response } from "express";
import {
  getPokemons,
  getPokemonById,
  getPokemonDetails,
} from "../services/pokemonServices";

export const getListPokemons = async (req: Request, res: Response) => {
  try {
    const pokemons = await getPokemons();
    res.json(pokemons);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOnePokemon = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let results = [];
    const pokemon = await getPokemonById(+id);
    res.json(pokemon);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPokemonWithType = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const pokemon = await getPokemonDetails(+id);
    res.json(pokemon);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
