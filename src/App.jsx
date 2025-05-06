import { useState } from 'react';
import Form from './components/Form';
import MemoryCard from './components/MemoryCard';

function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);


  async function startGame(e) {
    e.preventDefault();

    try {
      const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature");

      if (!response.ok) {
        throw new Error("Could not fetch data from API");
      }

      const data = await response.json();
      const dataSlice = getDataSlice(data)

      setEmojisData(dataSlice);
      setIsGameOn(true);
    } catch (error) {
      console.error('error fetching data:', error);
    }
  }

  function getDataSlice(data) {
    const randomIndices = getRandomIndices(data)
    const dataSlice = randomIndices.map(indice => data[indice])

    return dataSlice
  }

  function getRandomIndices(data) {
    const randomIndicesArray = [];
    for (let i = 0; i < 5; i++) {
      const randomNum = Math.floor(Math.random() * data.length);
      if (!randomIndicesArray.includes(randomNum)) {
        randomIndicesArray.push(randomNum)
      } else {
        i--
      }
    }
    return randomIndicesArray;
  }

  function turnCard() {
    console.log("Memory card clicked");
  }

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} />}
    </main>
  );
}

export default App;
