import axios from 'axios';
import { getTypeTranslations } from './../utils/transformData';
import { getPokemonDetails } from './../services/pokemonServices';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Pokémon API Methods', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('getTypeTranslations should return correct translations', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          name: 'grass',
          names: [
            { name: 'Planta', language: { name: 'es' } },
            { name: 'くさ', language: { name: 'ja' } }
          ]
        }
      })
    );

    const typeUrls = ['https://pokeapi.co/api/v2/type/12/'];
    const result = await getTypeTranslations(typeUrls);
    
    expect(result).toEqual({
      grass: {
        es: 'Planta',
        ja: 'くさ'
      }
    });
  });

  test('getPokemonDetails should return correct Pokémon details', async () => {
    mockedAxios.get
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            name: 'bulbasaur',
            types: [
              {
                slot: 1,
                type: {
                  name: 'grass',
                  url: 'https://pokeapi.co/api/v2/type/12/'
                }
              }
            ]
          }
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            name: 'grass',
            names: [
              { name: 'Planta', language: { name: 'es' } },
              { name: 'くさ', language: { name: 'ja' } }
            ]
          }
        })
      );

    const result = await getPokemonDetails(1);
    
    expect(result).toEqual({
      name: 'bulbasaur',
      types: [
        {
          slot: 1,
          type: {
            name: 'grass',
            url: 'https://pokeapi.co/api/v2/type/12/',
            names: [
              { language: { name: 'es', url: `${process.env.ULR_BASE}language/7/` }, name: 'Planta' },
              { language: { name: 'ja', url: `${process.env.ULR_BASE}language/11/` }, name: 'くさ' }
            ]
          }
        }
      ]
    });
  });

});
