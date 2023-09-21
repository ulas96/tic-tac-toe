import { useState, useEffect } from 'react';
import './App.css';
import xImage from "./assets/xImage.png";
import oImage from "./assets/oImage.png";


function App() {

    // const [player1, setPlayer1] = userState("");
    // const [player2, setPlayer2] = userState("");
    const [board, setBoard] = useState(Array(9).fill(''));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const handleTileClick = (index) => {
        if (board[index] || winner) return;

        const updatedBoard = [...board];
        updatedBoard[index] = currentPlayer;

        setBoard(updatedBoard);
        checkWinner(updatedBoard);
        togglePlayer();
    };

    const checkWinner = (currentBoard) => {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                currentBoard[a] === currentPlayer &&
                currentBoard[b] === currentPlayer &&
                currentBoard[c] === currentPlayer
            ) {
                setWinner(currentPlayer);
                break;
            }
        }

    };

    const togglePlayer = () => {
        setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
    };

    const resetGame = () => {
        setBoard(Array(9).fill(''));
        setCurrentPlayer('X');
        setWinner(null);
    };

    const renderTileContent = (value) => {
        if (value === 'X') {
            return <img src={xImage} alt="X" className="tile-image" />;
        } else if (value === 'O') {
            return <img src={oImage} alt="O" className="tile-image" />;
        }
        return null;
    };

    return (
        <div className="body"><div className="frame">
            {board.map((tile, index) => (
                <div
                    key={index}
                    className={`tile ${index % 2 === 0 ? 'black-tile' : 'white-tile'}`}
                    onClick={() => handleTileClick(index)}
                >
                    {renderTileContent(tile)}
                </div>
            ))}
        </div>

            {winner && (
                <div className="winner">
                    {winner === 'Draw' ? (
                        <p>It's a Draw!</p>
                    ) : (
                        <p>Player {winner} wins!</p>
                    )}
                    <button onClick={resetGame}>Reset</button>
                </div>
            )}
        </div>
    );
}

export default App;
