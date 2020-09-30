import React, { useState } from "react";

// language list for example only
import { languages } from "./languages";

// import component
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";

const App = () => {
  const [text, setText] = useState("");

  const [lang, setLang] = useState("hi");

  return (
    <div className="container">
      <h2>React transliterate</h2>

      <select
        className="language-dropdown"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
      >
        {languages.map((l) => (
          <option key={l.value} value={l.value}>
            {l.label}
          </option>
        ))}
      </select>

      <ReactTransliterate
        value={text}
        onChange={(e) => setText(e.target.value)}
        lang={lang}
        placeholder="Start typing here..."
        containerStyles={{
          width: "300px",
        }}
      />
    </div>
  );
};

export default App;
