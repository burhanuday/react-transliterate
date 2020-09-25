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
  onChange,
  onKeyDown = () => {},
}) => {
  const [options, setOptions] = useState([]);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [selection, setSelection] = useState(0);
  const [value, setValue] = useState("");
  const [matchStart, setMatchStart] = useState(-1);
  const [matchEnd, setMatchEnd] = useState(-1);
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
    setValue(value);

    // get the current index of the cursor
    const caret = getInputSelection(e.target).end;
    const input = inputRef.current;
    const caretPos = getCaretCoordinates(input, caret);

    // search for the last occurence of the space character from
    // the cursor
    const indexOfLastSpace = value.lastIndexOf(" ", caret - 1);

    // first character of the currently being typed word is
    // one character after the space character
    // index of last character is one before the current position
    // of the caret
    setMatchStart(indexOfLastSpace + 1);
    setMatchEnd(caret - 1);

    // currentWord is the word that is being typed
    const currentWord = value.slice(indexOfLastSpace + 1, caret);
    if (currentWord) {
      // make an api call to fetch suggestions
      getSuggestions(currentWord);

      const rect = input.getBoundingClientRect();

      // get the position of the top left corner of the suggestion box
      // and save it to state
      const top = caretPos.top + input.offsetTop;
      const left = Math.min(
        caretPos.left + input.offsetLeft - OPTION_LIST_Y_OFFSET,
        input.offsetLeft + rect.width - OPTION_LIST_MIN_WIDTH,
      );

      setTop(top);
      setLeft(left);
    } else {
      reset();
    }
  };

  const handleKeyDown = (event) => {
    const helperVisible = options.length > 0;

    if (helperVisible) {
      switch (event.keyCode) {
        case KEY_ESCAPE:
          event.preventDefault();
          reset();
          break;
        case KEY_UP:
          event.preventDefault();
          setSelection((options.length + selection - 1) % options.length);
          break;
        case KEY_DOWN:
          event.preventDefault();
          setSelection((selection + 1) % options.length);
          break;
        case KEY_ENTER:
        case KEY_RETURN:
        case KEY_TAB:
          event.preventDefault();
          handleSelection(selection);
          break;
        default:
          onKeyDown(event);
          break;
      }
    } else {
      onKeyDown(event);
    }
  };

  const handleResize = () => {};
  const handleSelection = (index) => {
    const currentString = value;
    const newValue =
      currentString.substr(0, matchStart) +
      options[index] +
      " " +
      currentString.substr(matchEnd + 1, currentString.length);
    setCaretPosition(inputRef.current, matchStart);
    setValue(newValue);
    reset();
  };

  const reset = () => {
    setSelection(0);
    setOptions([]);
  };

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
        value={value}
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
