import { Language } from "../types/Language";

type Config = {
  numOptions?: number;
  showCurrentWordAsLastSuggestion?: boolean;
  lang?: Language;
  punctuationsToBeHandledAtEndOfWord?: string[];
};

export const getTransliterateSuggestions = async (
  word: string,
  config?: Config,
): Promise<string[]> => {
  const {
    numOptions,
    showCurrentWordAsLastSuggestion,
    lang,
    punctuationsToBeHandledAtEndOfWord,
  } = config || {
    numOptions: 5,
    showCurrentWordAsLastSuggestion: true,
    lang: "hi",
    punctuationsToBeHandledAtEndOfWord: [",", '"'],
  };
  // fetch suggestion from api
  // const url = `https://www.google.com/inputtools/request?ime=transliteration_en_${lang}&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi&text=${word}`;

  let punctuation = word.slice(-1);
  if (punctuationsToBeHandledAtEndOfWord?.includes(punctuation)) {
    word = word.slice(0, -1);
  } else {
    punctuation = "";
  }

  const url = `https://inputtools.google.com/request?text=${word}&itc=${lang}-t-i0-und&num=${numOptions}&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    let suggestions;
    if (data && data[0] === "SUCCESS") {
      suggestions = showCurrentWordAsLastSuggestion
        ? [...data[1][0][1], word]
        : data[1][0][1];
    } else {
      if (showCurrentWordAsLastSuggestion) {
        suggestions = [word];
      }
      suggestions = [];
    }

    // doublequotes are returned as &quot by google-transliterate
    suggestions = suggestions.map((suggestion: string) =>
      suggestion.replace(/&quot;/g, '"'),
    );

    return punctuation
      ? suggestions.map((suggestion: string) => suggestion + punctuation)
      : suggestions;
  } catch (e) {
    // catch error
    console.error("There was an error with transliteration", e);
    return [];
  }
};
