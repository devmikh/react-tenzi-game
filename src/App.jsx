import React from 'react';
import './App.css';
import Header from './components/Header';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {

  const [dice, setDice] = React.useState(createNewDice());
  const [hasWon, setHasWon] = React.useState(false);
  const [bestRolls, setBestRolls] = React.useState(localStorage.getItem("bestRolls") || 0);
  const [currentRolls, setCurrentRolls] = React.useState(0);

  React.useEffect(() => {
    const allSelected = dice.every(die => die.isSelected);
    const allEqual = dice.every(die => die.value === dice[0].value);
    if (allSelected && allEqual) {
      setHasWon(true);  
    }
  }, [dice])

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
    if (hasWon) {
      if (bestRolls === 0 || currentRolls < bestRolls) {
        setBestRolls(currentRolls);
        localStorage.setItem("bestRolls", currentRolls);
      }
      setHasWon(false);
      setDice(createNewDice());
      setCurrentRolls(0);
    } else {
      setDice(oldDice => oldDice.map(oldDie => oldDie.isSelected ? oldDie : createRandomDie()));
      setCurrentRolls(oldRolls => oldRolls + 1);
    }
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
      {hasWon && <Confetti />}
      <main>
        <Header />
        <div className="dice-container">
          {diceElements}
        </div>
        <button className="roll-button" onClick={rollDice}>
          {hasWon ? "New Game" : "Roll"}
        </button>
        <div className="rolls-container">
          <div className="current-rolls">
            <h3>Rolls: {currentRolls}</h3>
          </div>
          <div className="best-rolls">
            <h3>Best: {bestRolls}</h3>
          </div>
        </div>
        
      </main>
    </div>
  );
}
