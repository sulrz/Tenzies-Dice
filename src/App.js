import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid"
import Confetti from "react-confetti";
import useWindowSize from 'react-use/lib/useWindowSize'

function App() {

  const [dice, setDice] = React.useState(allNewDice());
  const [rollsAmount, setRollsAmount] = React.useState(0);
  const [won, setWon] = React.useState(false);
  const { screenWidth, screenHeight } = useWindowSize();

  React.useEffect(() => {
    const val = dice[0].value;
    const wonGame = dice.every(die => die.value === val && die.isHeld);

    if (wonGame) 
      setWon(true);

  }, [dice]);

  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }

  function allNewDice() {
    const newDice = [];

    for (let i=0; i<10; i++) {
      newDice.push(generateDie());
    }

    return newDice;
  }

  function newGame() {
    setDice(allNewDice());
    setRollsAmount(0);
    setWon(false);
  }

  function rollDice() {
    setDice(prevState => prevState.map(die => {
      return die.isHeld ? 
      die :
      generateDie();
    }));

    setRollsAmount(prevState => prevState + 1);
  }

  function holdDice(id) {
    setDice(prevState => prevState.map(die => {
      return die.id === id ? 
        {...die, isHeld: !die.isHeld} : 
        die;
    }));

  }

  const diceElements = dice.map(die => 
    <Die 
      key={die.id} 
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  );

  return (
    <main>
      {won && 
        <Confetti 
          width={screenWidth}
          height={screenHeight}
        />}

      <div className="App">

        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>

        <p className="rollsAmount">Number of rolls: {rollsAmount}</p>

        <div className="dice-container">
          {diceElements}
        </div>
        
        {won ?
          <button 
            onClick={newGame}
            className="new-game"
          >
            New Game
          </button> 

          :

          <button 
            onClick={rollDice}
            className="roll-dice"
          >
            Roll
          </button>
        }
      </div>
    </main>
  );
}

export default App;
