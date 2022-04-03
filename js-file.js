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

const checkWinner = (player) => {
    let box = GameBoard.gameBoard;
    if (
        (box[0].textContent === box[1].textContent && box[1].textContent === box[2].textContent && box[2].textContent === player.mark) || 
        (box[3].textContent === box[4].textContent && box[4].textContent === box[5].textContent && box[5].textContent === player.mark) ||
        (box[6].textContent === box[7].textContent && box[7].textContent === box[8].textContent && box[8].textContent === player.mark)
        ) {
        console.log('WIn');
    }
    return false;
}

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
                if (checkWinner(player1)) {
                    console.log("Player 1 win");
                };
            }
        });
    });
    return {display};
})();

gameControl.display;