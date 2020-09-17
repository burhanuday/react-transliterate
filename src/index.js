import React, { useState } from "react";
import getCaretCoordinates from "textarea-caret";
import getInputSelection, { setCaretPosition } from "get-input-selection";

export const ExampleComponent = ({
  Component = "input",
  defaultValue,
  onBlur,
  disabled,
  lang = "hi",
}) => {
  const [options, setOptions] = useState([]);

  const getSuggestions = async (lastWord) => {
    const url = `https://www.google.com/inputtools/request?ime=transliteration_en_${lang}&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi&text=${lastWord}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data && data[0] === "SUCCESS") {
        const found = data[1][0][1];
        setOptions(found);
      }
    } catch (e) {
      // catch error
    }
  };

  const handleChange = () => {};
  const handleKeyDown = () => {};

  return (
    <Component
      disabled={disabled}
      onBlur={onBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};
