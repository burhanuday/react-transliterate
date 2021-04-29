import * as React from "react";
import { useEffect, useRef, useState } from "react";
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

interface Props extends React.HTMLProps<HTMLInputElement> {
  Component: React.ReactElement;
  offsetX: number;
  offsetY: number;
  containerClassName: string;
  containerStyles: React.CSSProperties;
  activeItemStyles: React.CSSProperties;
  maxOptions: number;
}

export const ReactTransliterate = ({
  Component = <input />,
  lang = "hi",
  offsetX = 0,
  offsetY = 10,
  onChange = () => {},
  value,
  onKeyDown = () => {},
  containerClassName = "",
  containerStyles = {},
  activeItemStyles = {},
  maxOptions = 5,
  ...rest
}: Props) => {
  const [options, setOptions] = useState<string[]>([]);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [selection, setSelection] = useState<number>(0);
  const [matchStart, setMatchStart] = useState(-1);
  const [matchEnd, setMatchEnd] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const getSuggestions = async (lastWord: string) => {
    // fetch suggestion from api
    // const url = `https://www.google.com/inputtools/request?ime=transliteration_en_${lang}&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi&text=${lastWord}`;
    const url = `https://inputtools.google.com/request?text=${lastWord}&itc=${lang}-t-i0-und&num=13&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data && data[0] === "SUCCESS") {
        let found = data[1][0][1];
        found = found.slice(0, maxOptions);
        setOptions(found);
      }
    } catch (e) {
      // catch error
      console.error("There was an error with transliteration", e);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    // bubble up event to the parent component
    onChange(e);

    // get the current index of the cursor
    const caret = getInputSelection(e.target).end;
    const input = inputRef.current;

    if (!input) return;

    const caretPos = getCaretCoordinates(input, caret);

    // search for the last occurence of the space character from
    // the cursor
    const indexOfLastSpace =
      value.lastIndexOf(" ", caret - 1) < value.lastIndexOf("\n", caret - 1)
        ? value.lastIndexOf("\n", caret - 1)
        : value.lastIndexOf(" ", caret - 1);

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
      // console.log("caretPos", caretPos.top);
      // console.log("rect", rect.height);
      // console.log("input", input.scrollHeight);
      // console.log("offset", input.offsetTop, input.scrollHeight);

      // get the position of the top left corner of the suggestion box
      // and save it to state
      // const top =
      //   caretPos.top < rect.height
      //     ? caretPos.top + input.offsetTop
      //     : input.scrollHeight + input.offsetTop - caretPos.top;

      const top =
        caretPos.top < rect.height
          ? caretPos.top + input.offsetTop
          : rect.height -
            ((input.scrollHeight - caretPos.top) % rect.height) +
            input.offsetTop;

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

  const handleResize = () => {
    // TODO implement the resize function to resize
    // the helper on screen size change
  };

  const handleSelection = (index: number) => {
    const currentString = value;
    // create a new string with the currently typed word
    // replaced with the word in transliterated language
    if (typeof currentString !== "string") return;
    const newValue =
      currentString.substring(0, matchStart) +
      options[index] +
      " " +
      currentString.substring(matchEnd + 1, currentString.length);

    // set the position of the caret (cursor) one character after the
    // the position of the new word
    setTimeout(() => {
      setCaretPosition(
        inputRef.current,
        matchStart + options[index].length + 1,
      );
    }, 1);

    // bubble up event to the parent component
    const e = ({ target: { value: newValue } } as unknown) as React.FormEvent<
      HTMLInputElement
    >;
    onChange(e);
    reset();
  };

  const reset = () => {
    // reset the component
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
      // position relative is required to show the component
      // in the correct position
      style={{
        ...containerStyles,
        position: "relative",
      }}
      className={containerClassName}
    >
      {React.cloneElement(Component, {
        onChange: handleChange,
        onKeyDown: handleKeyDown,
        ref: inputRef,
        value: value,
        ...rest,
      })}
      {/* <Component
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={value}
        {...rest}
      /> */}
      {options.length > 0 && (
        <ul
          style={{
            left: `${left + offsetX}px`,
            top: `${top + offsetY}px`,
            position: "absolute",
            width: "auto",
          }}
          className={classes.ReactTransliterate}
        >
          {options.map((item, index) => (
            <li
              className={index === selection ? classes.Active : undefined}
              style={index === selection ? activeItemStyles || {} : {}}
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
      )}
    </div>
  );
};
