const container = document.querySelector(".container");

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

        (box[6].textContent === box[7].textContent && box[7].textContent === box[8].textContent && box[8].textContent === player.mark) ||

        (box[0].textContent === box[3].textContent && box[3].textContent === box[6].textContent && box[6].textContent === player.mark) ||

        (box[1].textContent === box[4].textContent && box[4].textContent === box[7].textContent && box[7].textContent === player.mark) ||

        (box[2].textContent === box[5].textContent && box[5].textContent === box[8].textContent && box[8].textContent === player.mark) ||

        (box[0].textContent === box[4].textContent && box[4].textContent === box[8].textContent && box[8].textContent === player.mark) ||

        (box[2].textContent === box[4].textContent && box[4].textContent === box[6].textContent && box[6].textContent === player.mark)
        ) {
        return true;
    }
}

const checkDraw = () => {
    let draw = true;
    for (div of GameBoard.gameBoard) {
        if (div.textContent.length === 0) {
            draw = false;
        }
    }
    return draw;
}

const gameControl = (() => {
    displayControl.board();
    const boxes = document.querySelectorAll('.item');
    const start = document.querySelector('#sBtn');
    const form = document.querySelector('.form-container');
    const submit = document.querySelector('#submit');
    const currentPlayer = document.querySelector('#player');
    const playerOne = document.querySelector('#playerOne');
    const playerTwo = document.querySelector('#playerTwo');
    start.addEventListener('click', () => {
        form.style.cssText = 'opacity: 1';
    });
    submit.addEventListener('click', () => {
        const player1 = Player(playerOne.value, 'X');
        const player2 = Player(playerTwo.value, 'O');
        currentPlayer.textContent = `${player1.name}'s turn`;
        form.style.cssText = 'opacity: 0';
        boxes.forEach((box) => {
            box.textContent = '';
            box.addEventListener('click', () => {
                if (box.textContent.length === 0 && !(checkWinner(player1) || checkWinner(player2))) {
                    if (currentPlayer.textContent === `${playerOne.value}'s turn`) {
                        marker(box, player1.mark);
                        currentPlayer.textContent = `${playerTwo.value}'s turn`;
                    }
                    else {
                        marker(box, player2.mark);
                        currentPlayer.textContent = `${playerOne.value}'s turn`;
                    }
                }
                if (checkWinner(player1)) {
                    currentPlayer.textContent = `${player1.name} is the winner!`;
                }
                else if (checkWinner(player2)) {
                    currentPlayer.textContent = `${player2.name} is the winner!`;
                }
                else if (checkDraw()) {
                    currentPlayer.textContent = "It's a tie!";
                }
            });
        });
    })
})();
