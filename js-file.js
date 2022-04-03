const container = document.querySelector(".container");
const currentPlayer = document.querySelector('#player');

const GameBoard = (() => {
    const gameBoard = [];
    for (let i=0; i < 9; i++) {
        const div = document.createElement('div');
        div.classList.add('item');
        div.setAttribute('id', i);
        gameBoard.push(div);
    }
    return {gameBoard};
})();

// for (div of GameBoard.gameBoard) {
//     container.appendChild(div);
// }

const displayControl = (() => {
    const board = function () {
        for (div of GameBoard.gameBoard) {
            container.appendChild(div);
        }
    }
    return {board}
})();

function marker(box, marker) {
    box.textContent = marker;
}

const Player = (name, mark) => {
    return {name, mark};
};

const gameControl = (() => {
    const display = displayControl.board();
    const boxes = document.querySelectorAll('.item');
    const player1 = Player('Evan', 'X');
    const player2 = Player('Kyaw', 'O');
    boxes.forEach((box) => {
        box.addEventListener('click', () => {
            console.log(box.id);
            if (box.textContent.length === 0) {
                if (currentPlayer.textContent === 'Player') {
                    marker(box, player1.mark);
                    currentPlayer.textContent = 'Kyaw';
                }
                else {
                    marker(box, player2.mark);
                    currentPlayer.textContent = 'Player';
                }
            }
        });
    });
    return {display};
})();

gameControl.display;

