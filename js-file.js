const container = document.querySelector(".container");

const GameBoard = (() => {
    const gameBoard = [];
    for (let i=0; i < 9; i++) {
        const div = document.createElement('div');
        div.classList.add('item');
        div.setAttribute('id', i);
        div.textContent = "A";
        gameBoard.push(div);
    }
    return {gameBoard};
})();

// for (div of GameBoard.gameBoard) {
//     container.appendChild(div);
// }

const gameControl = (() => {
    const board = function () {
        for (div of GameBoard.gameBoard) {
            container.appendChild(div);
        }
    }
    return {board}
})();

gameControl.board();

function marker(box, marker) {
    box.textContent = marker;
}

const Player = (name, mark) => {
    const boxes = document.querySelectorAll('.item');
    boxes.forEach((box) => {
        box.addEventListener('click', () => {
            marker(box, mark);
            console.log(box.id);
        });
    });
    return {name};
};

let player = Player('Evan', 'X');

