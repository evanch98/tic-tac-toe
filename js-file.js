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

const Player = (name, content) => {
    const divs = document.querySelectorAll('.item');
    divs.forEach((div) => {
        div.addEventListener('click', () => {
            div.textContent = content;
        });
    });
    return {content};
};

for (div of GameBoard.gameBoard) {
    container.appendChild(div);
}

const player = Player('Evan', 'X');