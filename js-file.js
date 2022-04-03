const container = document.querySelector(".container"); // The container for grid items

// GameBoard object to create a game board
const GameBoard = (() => {
    const gameBoard = [];
    // The board contains 3x3 grid
    for (let i=0; i < 9; i++) {
        const div = document.createElement('div');
        div.classList.add('item');
        gameBoard.push(div);
    }
    return {gameBoard};
})();

// displayControl object to render grid on the screen
const displayControl = (() => {
    const board = function () {
        for (div of GameBoard.gameBoard) {
            container.appendChild(div);
        }
    }
    return {board}
})();

// To allow the players to mark on the grid
function marker(box, marker) {
    box.textContent = marker;
}

// Player object that returns the name and marker of the players
const Player = (name, mark) => {
    return {name, mark};
};

// To check the winning condition
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

// To check the draw condition
const checkDraw = () => {
    // This function will check if all the grids are filled.
    let draw = true;
    for (div of GameBoard.gameBoard) {
        if (div.textContent.length === 0) {
            draw = false;
        }
    }
    return draw;
}

// Game's logic and control of the game
const gameControl = (() => {
    displayControl.board(); // To display the board on the screen
    const boxes = document.querySelectorAll('.item');           // Selecting grid boxes
    const start = document.querySelector('#sBtn');              // Start / Restart button
    const form = document.querySelector('.form-container');     // Form container
    const submit = document.querySelector('#submit');           // Submit button
    const currentPlayer = document.querySelector('#player');    // Current Player's text on the screen
    const playerOne = document.querySelector('#playerOne');     // Player one name from the text input
    const playerTwo = document.querySelector('#playerTwo');     // Player two name from the text input

    // Adding event listener to Start / Restart Button
    start.addEventListener('click', () => {
        // To make the form element appear
        form.style.cssText = 'opacity: 1';
    });

    // Adding event listener to Submit button
    submit.addEventListener('click', () => {
        const player1 = Player(playerOne.value, 'X');           // Creating player one object
        const player2 = Player(playerTwo.value, 'O');           // Creating player two object
        currentPlayer.textContent = `${player1.name}'s turn`;   // To show the current player (Player one)
        form.style.cssText = 'opacity: 0';                      // Hiding the form container
        // Selecting grid items (boxes)
        boxes.forEach((box) => {
            box.textContent = '';                               // Clearing the text in the grids
            box.addEventListener('click', () => {
                // The marking on the box will happen only when the box is not already filled and neither the player one nor player two has won
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
                // Checking winning or drawing
                if (checkWinner(player1)) {
                    currentPlayer.textContent = `${player1.name} is the winner!`;
                }
                else if (checkWinner(player2)) {
                    currentPlayer.textContent = `${player2.name} is the winner!`;
                }
                else if (checkDraw()) {
                    // If all the grids are already filled and neither the player one nor the player two has won
                    currentPlayer.textContent = "It's a tie!";
                }
            });
        });
    })
})();
