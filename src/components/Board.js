import React, { useEffect, useState } from "react";
import Block from "./Block";

function Board() {
  const [marks, setMarks] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [player, setPlayer] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winPlayer, setWinPlayer] = useState();
  const [isEmptyBox, setIsEmptyBox] = useState(false);

  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 2],
    [3, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const changeMark = (position) => {
    const newMarks = [...marks];
    if (newMarks[position] === 0 && !isGameOver) {
      newMarks[position] = player;

      setTimeout(() => {
        setMarks(newMarks);
        setPlayer(player === 1 ? 2 : 1);

        const remainingBoxes = marks.filter((m) => {
          return m < 1;
        });
        if (remainingBoxes.length === 1) {
          setIsEmptyBox(true);
          setIsGameOver(true);
        }
      }, 500);
    }
  };

  const newGame = () => {
    setMarks([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setPlayer(1);
    setIsGameOver(false);
    setWinPlayer("");
    setIsEmptyBox(false);
  };

  useEffect(() => {
    for (let c of combinations) {
      if (marks[c[0]] === 1 && marks[c[1]] === 1 && marks[c[2]] === 1) {
        setIsGameOver(true);
        setWinPlayer(1);
      } else if (marks[c[0]] === 2 && marks[c[1]] === 2 && marks[c[2]] === 2) {
        setIsGameOver(true);
        setWinPlayer(2);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marks]);

  return (
    <div className="row my-5 container">
      <div className="col-md-6 d-flex justify-content-center  flex-column">
        <h2>Click any box to start game</h2>
        {!winPlayer && <h3>Player {player} chance</h3>}
        {winPlayer && <h3>Player {player} wins</h3>}
        {isEmptyBox && <h3>Match Tie</h3>}
        {winPlayer && (
          <button onClick={newGame} className="btn btn-success w-50 my-3">
            ReStart
          </button>
        )}
        {!winPlayer && (
          <button
            onClick={newGame}
            className="btn btn-outline-danger w-50 my-3"
          >
            ReSet
          </button>
        )}
      </div>
      <div className="col-md-6">
        <div className="board mx-5 phoneScreen">
          <div className="row mx-5 blockWidth">
            {marks.map((m, i) => (
              <div key={i} className="col-4">
                <Block mark={m} position={i} onClick={changeMark} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
