import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    async function fetchPokemons() {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=12"
      );
      const results = response.data.results;
      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const pokeDetails = await axios.get(pokemon.url);
          return {
            name: pokeDetails.data.name,
            image:
              pokeDetails.data.sprites.other.dream_world.front_default,
          };
        })
      );
      setPokemons(pokemonData);
    }
    fetchPokemons();
  }, []);

  const handleCardClick = (pokemon) => {
    if(selectedCards.includes(pokemon.name)) {
      //Game over
      if(score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
      setSelectedCards([]);
    } else {
      //Continue game
      setSelectedCards([...selectedCards, pokemon.name]);
      setScore(score + 1);
    }
    //Shuffle cards
    setPokemons(shuffleArray(pokemons));
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  }

  return (
    <div className="App">
      <div className="header">
        <div id="header-left">
          <h1>Memory Card Game</h1>
          <h3>
            Get points by clicking on an image but don&apos;t click on any more
            than once!
          </h3>
        </div>
        <div id="header-right">
          <h3>Score: {score}</h3>
          <h3>Best Score:{bestScore}</h3>
        </div>
      </div>
      <div className="card-grid">
        {pokemons.map((pokemon) => (
          <Card
            key={pokemon.name}
            pokemon={pokemon}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
