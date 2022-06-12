import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";
import Results from "./Results";
import Photos from "./Photos";


export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [photos, setPhotos] = useState(null);

  function handleDictionResponse(response) {
setResults(response.data[0]);
  }

  function handlePewelsResponse(response) {
    setPhotos (response.data.photos);
  }

  function search() {
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
    axios.get(apiUrl).then(handleDictionResponse);

    let pexelsApiKey =
      "563492ad6f9170000100000174c5df8cd72341c4b3580149861d796f";
    let pexelsApiUrl =
      `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
     let headers = { Authorization: `Bearer ${pexelsApiKey}`};
     axios.get(pexelsApiUrl, { headers: headers}).then(handlePewelsResponse);
  }

function handleSubmit(event) {
  event.preventDefault();
  search();
}

function load() {
  setLoaded(true);
  search();
}


  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  if (loaded) {
  return (
    <div className="Dictionary">
      <section>
        <h1>What word do you want to look up?</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            onChange={handleKeywordChange}
            defaultValue={props.defaultKeyword}
          />
        </form>
        <div className="hint">
          suggested words: sunset, wine, yoga, plant...
        </div>
      </section>
      <Results results={results} />
      <Photos photos={photos} />
    </div>
  );
}
else {
  load();
  return "Loading";
}
}