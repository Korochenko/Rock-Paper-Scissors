let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'Scissors';
    }

    return computerMove;
}

let isAutoPlay = false;
let intervalId;

document
    .querySelector('.js-autoplay-button')
    .addEventListener('click', () => {
        autoPlay();
    })

function autoPlay() {
    if (!isAutoPlay) {
        intervalId = setInterval(function () {
            const playerMove = pickComputerMove();
            playGame(playerMove);
            document
                .querySelector('.js-autoplay-button')
                .innerHTML = 'Stop Playing';
        }, 1000);
        isAutoPlay = true;
    } else {
        clearInterval(intervalId);
        isAutoPlay = false;
        document
            .querySelector('.js-autoplay-button')
            .innerHTML = 'Auto Play';
    }

}

document
    .querySelector('.js-rock-button').addEventListener('click', () => {
        playGame('Rock');
    });

document
    .querySelector('.js-paper-button').addEventListener('click', () => {
        playGame('Paper');
    });

document
    .querySelector('.js-scissors-button').addEventListener('click', () => {
        playGame('Scissors');
    });

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('Rock');
    } else if (event.key === 'p') {
        playGame('Paper');
    } else if (event.key === 's') {
        playGame('Scissors');
    } else if (event.key === 'a') {
        autoPlay();
    } else if (event.key === 'Backspace') {
        displayResetScore();
    }

});

function playGame(playerMove) {

    const computerMove = pickComputerMove('score');

    let result = '';

    if (playerMove === 'Scissors') {
        if (computerMove === 'Rock') {
            result = 'You Lose'
        } else if (computerMove === 'Paper') {
            result = 'You Win'
        } else if (computerMove === 'Scissors') {
            result = 'Tie'
        }

    } else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
            result = 'You Win'
        } else if (computerMove === 'Paper') {
            result = 'Tie'
        } else if (computerMove === 'Scissors') {
            result = 'You Lose'
        }

    } else if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = 'Tie'
        } else if (computerMove === 'Paper') {
            result = 'You Lose'
        } else if (computerMove === 'Scissors') {
            result = 'You Win'
        }
    }

    if (result === 'You Win') {
        score.wins = score.wins += 1;
    } else if (result === 'You Lose') {
        score.losses = score.losses += 1;
    } else if (result === 'Tie') {
        score.ties = score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();
    document.querySelector('.js-result')
        .innerHTML = result;


    document.querySelector('.js-moves')
        .innerHTML = `You 
        <img src="image/${playerMove}-emoji.png" class="move-icon">
        <img src="image/${computerMove}-emoji.png" class="move-icon">
        Computer`;

}

document
    .querySelector('.js-reset-score-button')
    .addEventListener('click', () => {
        displayResetScore();
    });

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses:${score.losses}, Ties:${score.ties} `;
}

function displayResetScore() {

    let confirmationMessageHTML = '';

    const html = `
    <p>Are you sure you want to reset the score</p>
    
    <button onclick = "
    resetScore();
    document
    .querySelector('.js-confirmation-message')
    .innerHTML = '';
    " class = "js-yes-autoplay-button yes-autoplay-button">Yes</button>
    
    <button onclick = "
    document
    .querySelector('.js-confirmation-message ')
    .innerHTML = '';
    " class = "no-autoplay-button">No</button>`;

    confirmationMessageHTML += html;

    document
        .querySelector('.js-confirmation-message')
        .innerHTML = confirmationMessageHTML;

};

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
};



