import React, { useEffect, useRef, useState } from "react";
import getInputSelection, { setCaretPosition } from "./util";
import getCaretCoordinates from "textarea-caret";
import classes from "./styles.module.css";

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_RETURN = 13;
const KEY_ENTER = 14;
const KEY_ESCAPE = 27;
const KEY_TAB = 9;

const OPTION_LIST_Y_OFFSET = 10;
const OPTION_LIST_MIN_WIDTH = 100;

export const ReactTransliterate = ({
  Component = "input",
  defaultValue,
  onBlur,
  disabled,
  lang = "hi",
  offsetX = 0,
  offsetY = 0,
  value,
  onChange,
}) => {
  const [options, setOptions] = useState([]);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [selection, setSelection] = useState(0);
  const inputRef = useRef(null);

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
      console.error("There was an error with transliteration", e);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const lastWord = value.slice(value.lastIndexOf(" ") + 1);
    if (lastWord) {
      getSuggestions(lastWord);
      const caret = getInputSelection(e.target).end;
      const input = inputRef.current;
      const caretPos = getCaretCoordinates(input, caret);
      const rect = input.getBoundingClientRect();

      const top = caretPos.top + input.offsetTop;
      const left = Math.min(
        caretPos.left + input.offsetLeft - OPTION_LIST_Y_OFFSET,
        input.offsetLeft + rect.width - OPTION_LIST_MIN_WIDTH,
      );

      setTop(top);
      setLeft(left);
    } else {
      setOptions([]);
    }
  };
  const handleKeyDown = () => {};
  const handleResize = () => {};
  const handleSelection = (index) => {};

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Component
        disabled={disabled}
        onBlur={onBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <ul
        style={{
          left: left + offsetX,
          top: top + offsetY,
          position: "absolute",
        }}
        className={classes.ReactTransliterate}
      >
        {options.map((item, index) => (
          <li
            className={index === selection ? classes.Active : null}
            onMouseEnter={() => {
              setSelection(index);
            }}
            onClick={() => handleSelection(index)}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
