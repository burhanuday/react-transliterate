import React from "react";

import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";

const App = () => {
  return (
    <div className="container">
      <h2>React transliterate</h2>
      <ReactTransliterate lang="hi" />
    </div>
  );
};

export default App;
