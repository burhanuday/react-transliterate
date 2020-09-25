# react-transliterate

> Transliterate component for React

[![NPM](https://img.shields.io/npm/v/react-transliterate.svg)](https://www.npmjs.com/package/react-transliterate) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-transliterate
yarn add react-transliterate
```

## Usage

```jsx
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
```

## License

MIT © [burhanuday](https://github.com/burhanuday)
