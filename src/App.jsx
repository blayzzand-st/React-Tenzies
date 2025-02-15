import { useState, useRef, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

import Header from "./components/Header.jsx";
import Die from './components/Die.jsx'

export default function App() {

    const buttonRef = useRef(null);

    function generateRandomNumbers() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                id: nanoid(),
                value: Math.ceil(Math.random() * 6),
                isHeld: false
            }));
    }

    const [dice, setDice] = useState(() => generateRandomNumbers());

    function toggleHold(dieId) {
        const newDice = dice.map(die => (
            dieId === die.id ? {...die, isHeld: !die.isHeld} : die
        ));

        setDice(newDice);
    }

    const randomDice = dice.map(dieObj => <Die
        key={dieObj.id}
        val={dieObj.value}
        isHeld={dieObj.isHeld}
        onClick={() => toggleHold(dieObj.id)}
    />);

    function rollDice() {
        if (!gameWon) {
            setDice(prevDice => prevDice.map(die => (
                die.isHeld ?
                    die :
                    { ...die, value: Math.ceil(Math.random() * 6) })
            ));
        }
        else {
            setDice(generateRandomNumbers());
        }
    }

    const gameWon = dice.every(
        (die, _, arr) => die.isHeld && die.value === arr[0].value
    )

    useEffect(function() {
        buttonRef.current.focus();
    }, [gameWon])

    return (
        <>
            <Header />
            <main>
                {gameWon && <Confetti width={window.innerWidth} height={window.innerHeight} />}
                {gameWon && <div className="sr-only">
                    <p>Congratulations! You won! Press &#34;New Game&#34; to start again</p>
                </div>}
                <div className="dice-container">
                    {randomDice}
                </div>
                <button
                    ref={buttonRef}
                    className="roll-btn"
                    onClick={rollDice}>{ gameWon ? "New Game" : "Roll" }</button>
            </main>
        </>
    );
}