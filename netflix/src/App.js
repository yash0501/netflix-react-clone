import React, {useState, useEffect} from 'react'
import './App.css';
import Row from './components/Row'
import requests from './requests';

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending}/>
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
    </div>
  );
}

export default App;
