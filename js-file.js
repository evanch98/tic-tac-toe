const container = document.querySelector(".container");

const GameBoard = (() => {
    const gameBoard = [];
    for (let i=0; i < 9; i++) {
        const div = document.createElement('div');
        div.textContent = "A";
        gameBoard.push(div);
    }
    return {gameBoard};
})();

for (div of GameBoard.gameBoard) {
    container.appendChild(div);
}