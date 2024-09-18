import { Request, Response } from "express";
import {
  getPokemons,
  getPokemonById,
  getPokemonDetails,
} from "../services/pokemonServices";

/**
 * @swagger
 * /api/pokemons:
 *   get:
 *     summary: Obtiene la lista de Pokémon
 *     description: Este endpoint retorna una lista de todos los Pokémon disponibles en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de Pokémon
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Bulbasaur"
 *                   type:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "Grass"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

export const getListPokemons = async (req: Request, res: Response) => {
  try {
    const pokemons = await getPokemons();
    res.json(pokemons);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/pokemons/{id}:
 *   get:
 *     summary: Obtiene un Pokémon por ID
 *     description: Este endpoint retorna la información de un Pokémon específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID del Pokémon que deseas obtener.
 *     responses:
 *       200:
 *         description: Información del Pokémon
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Bulbasaur"
 *                 type:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Grass"
 *       404:
 *         description: Pokémon no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Pokémon no encontrado"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
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

/**
 * @swagger
 * /api/pokemons/type/{id}:
 *   get:
 *     summary: Obtiene un Pokémon con su tipo por ID
 *     description: Este endpoint retorna la información de un Pokémon específico basado en su ID, incluyendo detalles sobre su tipo.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID del Pokémon que deseas obtener.
 *     responses:
 *       200:
 *         description: Información del Pokémon con su tipo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Bulbasaur"
 *                 type:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Grass"
 *       404:
 *         description: Pokémon no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Pokémon no encontrado"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
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
