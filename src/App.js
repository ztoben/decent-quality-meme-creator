import React from "react";
import GlobalStyles from "./GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <div css={{ textAlign: "center" }}>
        <h1>Decent Quality Meme Creator</h1>
        <p>A work in progress...</p>
        <img
          src="/images/build-all-the-things.png"
          alt="Build All The Things!"
          width={400}
        />
      </div>
    </>
  );
}

export default App;
