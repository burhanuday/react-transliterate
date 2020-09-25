import React, { useState } from "react";

import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";

const App = () => {
  const [text, setText] = useState("");

  return (
    <div className="container">
      <h2>React transliterate</h2>
      <ReactTransliterate
        value={text}
        onChange={(e) => setText(e.target.value)}
        lang="hi"
      />
    </div>
  );
};

export default App;
