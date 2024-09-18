import axios from "axios";

export const getTypeTranslations = async (
    typeUrls: string[]
  ): Promise<{ [typeName: string]: { [language: string]: string } }> => {
    const translations: { [typeName: string]: { [language: string]: string } } =
      {};
  
    // Obtener los datos de todos los tipos en paralelo
    const typeResponses = await Promise.all(
      typeUrls.map((url) => axios.get(url))
    );
  
    // Obtener las traducciones
    typeResponses.forEach((response) => {
      const type = response.data;
      translations[type.name] = {};
      type.names.forEach(
        ({ name, language }: { name: string; language: { name: string } }) => {
          if (language.name === "es" || language.name === "ja") {
            translations[type.name][language.name] = name;
          }
        }
      );
    });
  
    return translations;
  };