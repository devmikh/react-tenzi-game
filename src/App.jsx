import React from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';

export default function App() {

  const [dice, setDice] = React.useState(createNewDice());

  function createRandomDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isSelected: false
    }
  }

  function createNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(createRandomDie());
    }
    return newDice;
  }

  function selectDie(id) {
    setDice(oldDice => oldDice.map(oldDie => oldDie.id === id ? { ...oldDie, isSelected: !oldDie.isSelected} : oldDie));
  }

  function rollDice() {
    setDice(oldDice => oldDice.map(oldDie => oldDie.isSelected ? oldDie : createRandomDie()));
  }

  const diceElements = dice.map(die => {
    return <Die
              key={die.id}
              value={die.value}
              isSelected={die.isSelected}
              selectDie={() => selectDie(die.id)}  
            />
  });

  return (
    <div className="App">
      <main>
        <div className="dice-container">
          {diceElements}
        </div>
        <button className="roll-button" onClick={rollDice}>
          ROLL
        </button>
      </main>
    </div>
  );
}
