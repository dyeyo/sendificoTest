import axios from "axios";
import { httpsAgent } from "./../config/axios";
import { getTypeTranslations } from "./../utils/transformData";

export const getPokemons = async () => {
  try {
    const response = await axios.get(`${process.env.ULR_BASE}?limit=100`, {
      httpsAgent,
      timeout: 5000,
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los datos del Pokémon.");
  }
};

export const getPokemonById = async (id: number) => {
  try {
    const response = await axios.get(`${process.env.ULR_BASE}${id}`, {
      httpsAgent,
      timeout: 5000,
    });
    const pokemon = response.data;
    const result = {
      name: pokemon.name,
      types: pokemon.types.map(
        ({
          slot,
          type,
        }: {
          slot: number;
          type: { name: string; url: string };
        }) => ({
          slot,
          type: {
            name: type.name,
            url: type.url,
          },
        })
      ),
    };
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los datos del Pokémon.");
  }
};

export const getPokemonDetails = async (pokemonId: number) => {
  try {
    const { data: pokemon } = await axios.get(
      `${process.env.ULR_BASE}${pokemonId}`
    );
    const typeUrls = pokemon.types.map(
      ({ type }: { type: { url: string } }) => type.url
    );

    const typeTranslations = await getTypeTranslations(typeUrls);

    const result = {
      name: pokemon.name,
      types: pokemon.types.map(
        ({
          slot,
          type,
        }: {
          slot: number;
          type: { name: string; url: string };
        }) => {
          const { name, url } = type;
          const names = typeTranslations[name]
            ? [
                {
                  language: {
                    name: "es",
                    url: `${process.env.ULR_BASE}language/7/`,
                  },
                  name: typeTranslations[name].es || "",
                },
                {
                  language: {
                    name: "ja",
                    url: `${process.env.ULR_BASE}language/11/`,
                  },
                  name: typeTranslations[name].ja || "",
                },
              ]
            : [];

          return { slot, type: { name, url, names } };
        }
      ),
    };

    return result;
  } catch (error) {
    throw new Error("Error al obtener los datos del Pokémon.");
  }
};
