import React from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Header from './components/Header';
import Die from './components/Die';

export default function App() {

  /*
    State for holding currently displayed dice.
    Initialized with an array of newly created dice objects with random values
  */
  const [dice, setDice] = React.useState(createNewDice());

  // Holds boolean value to determine whether user has won or not
  const [hasWon, setHasWon] = React.useState(false);

  /*
    State for holding best rolls count of the user. 
    Initialized with bestRolls value from localStorage. If it's not there, defaults to 0
  */
  const [bestRolls, setBestRolls] = React.useState(localStorage.getItem("bestRolls") || 0);

  /*
    State for holding current rolls count of the user.
    Initialized with 0
  */
  const [currentRolls, setCurrentRolls] = React.useState(0);

  /*
    Checks if all elements in dice array are selected and equal to each other.
    If yes, then user has won.
    Triggers on every change of the dice state
  */
  React.useEffect(() => {
    const allSelected = dice.every(die => die.isSelected);
    const allEqual = dice.every(die => die.value === dice[0].value);
    if (allSelected && allEqual) {
      setHasWon(true);  
    }
  }, [dice])

  // Helper functions

  // Create single random die object
  function createRandomDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isSelected: false
    }
  }

  // Create an array of random die objects
  function createNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(createRandomDie());
    }
    return newDice;
  }

  // Change isSelected value of the die based on its id
  function selectDie(id) {
    setDice(oldDice => oldDice.map(oldDie => oldDie.id === id ? { ...oldDie, isSelected: !oldDie.isSelected} : oldDie));
  }

  /* 
    Button handler
  */
  function rollDice() {
    /*
      'New Game' button functionality (when hasWon is true)
      Sets new rolls record, if it's better than the previous best score;
      Sets the game in its initial state: hasWon now is false, new dice are created, current rolls set to 0
    */
    if (hasWon) {
      if (bestRolls === 0 || currentRolls < bestRolls) {
        setBestRolls(currentRolls);
        localStorage.setItem("bestRolls", currentRolls);
      }
      setHasWon(false);
      setDice(createNewDice());
      setCurrentRolls(0);
    /* 
      'Roll' button functionality (when hasWon is false)
      Roll all dice except for the ones that are currently selected
      Add 1 to the current rolls count
    */
    } else {
      setDice(oldDice => oldDice.map(oldDie => oldDie.isSelected ? oldDie : createRandomDie()));
      setCurrentRolls(oldRolls => oldRolls + 1);
    }
  }

  // Create dice elements from dice array
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
