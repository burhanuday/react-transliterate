import React, { useState } from "react";

// language list for example only
import { languages } from "./languages";

// import component
import { ReactTransliterate, Language } from "react-transliterate";
import "react-transliterate/dist/index.css";

// Material Ui input component
import Input from "@material-ui/core/Input";

const App = () => {
  const [text, setText] = useState("");

  const [lang, setLang] = useState<Language>("hi");
  const [useDebounce, setUseDebounce] = useState<boolean>(false);
  const toggleUseDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseDebounce(e.target.checked);
  };

  return (
    <div className="container">
      <h2>React transliterate</h2>

      <select
        className="language-dropdown"
        value={lang}
        onChange={(e) => setLang(e.target.value as Language)}
      >
        {languages.map((l) => (
          <option key={l.value} value={l.value}>
            {l.label}
          </option>
        ))}
      </select>

      <div className="spacer" />
      <form>
        <input
          type="checkbox"
          checked={useDebounce}
          name="useDebounce"
          onChange={toggleUseDebounce}
        />
        <label htmlFor="useDebounce">Use Debouncing</label>
      </form>
      <div className="spacer" />

      <label htmlFor="react-transliterate-input">Using input</label>
      <ReactTransliterate
        value={text}
        onChangeText={(text) => {
          setText(text);
        }}
        lang={lang}
        placeholder="Start typing here..."
        id="react-transliterate-input"
        useDebounce={useDebounce}
        className="input"
      />

      <div className="spacer" />

      <label htmlFor="react-transliterate-textarea">Using textarea</label>
      <ReactTransliterate
        renderComponent={(props) => <textarea className="textarea" {...props} />}
        value={text}
        onChangeText={(text) => {
          setText(text);
        }}
        lang={lang}
        placeholder="Start typing here..."
        id="react-transliterate-textarea"
        useDebounce={useDebounce}
      />

      <div className="spacer" />

      <label htmlFor="react-transliterate-material-ui-input">
        Using Material UI input
      </label>
      <ReactTransliterate
        renderComponent={(props) => {
          const inputRef = props.ref;

          delete props["ref"];

          return <Input fullWidth {...props} inputRef={inputRef} />;
        }}
        value={text}
        onChangeText={(text) => {
          setText(text);
        }}
        lang={lang}
        useDebounce={useDebounce}
        placeholder="Start typing here..."
        id="react-transliterate-material-ui-input"
      />
    </div>
  );
};

export default App;
