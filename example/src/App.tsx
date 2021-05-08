import React, { useState } from "react";

// language list for example only
import { languages } from "./languages";

// import component
import { ReactTransliterate, Languages } from "react-transliterate";
import "react-transliterate/dist/index.css";

const App = () => {
  const [text, setText] = useState("");

  const [lang, setLang] = useState<Languages>("hi");

  return (
    <div className="container">
      <h2>React transliterate</h2>

      <select
        className="language-dropdown"
        value={lang}
        onChange={(e) => setLang(e.target.value as Languages)}
      >
        {languages.map((l) => (
          <option key={l.value} value={l.value}>
            {l.label}
          </option>
        ))}
      </select>

      <ReactTransliterate
        value={text}
        onChangeText={(text) => {
          console.log("[example]", "text value", text);

          setText(text);
        }}
        lang={lang}
        placeholder="Start typing here..."
        containerStyles={{
          width: "300px",
        }}
      />

      <ReactTransliterate
        Component={<textarea />}
        value={text}
        onChangeText={(text) => {
          console.log("[example]", "text value", text);

          setText(text);
        }}
        lang={lang}
        placeholder="Start typing here..."
      />
    </div>
  );
};

export default App;
