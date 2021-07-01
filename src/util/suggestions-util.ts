import { Language } from "../types/Language";

type Config = {
  numOptions?: number;
  showCurrentWordAsLastSuggestion?: boolean;
  lang?: Language;
};

export const getTransliterateSuggestions = async (
  word: string,
  config?: Config,
): Promise<string[]> => {
  const { numOptions, showCurrentWordAsLastSuggestion, lang } = config || {
    numOptions: 5,
    showCurrentWordAsLastSuggestion: true,
    lang: "hi",
  };
  // fetch suggestion from api
  // const url = `https://www.google.com/inputtools/request?ime=transliteration_en_${lang}&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi&text=${word}`;

  const url = `https://inputtools.google.com/request?text=${word}&itc=${lang}-t-i0-und&num=${numOptions}&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data && data[0] === "SUCCESS") {
      const found = showCurrentWordAsLastSuggestion
        ? [...data[1][0][1], word]
        : data[1][0][1];
      return found;
    } else {
      if (showCurrentWordAsLastSuggestion) {
        return [word];
      }
      return [];
    }
  } catch (e) {
    // catch error
    console.error("There was an error with transliteration", e);
    return [];
  }
};
