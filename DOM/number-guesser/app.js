//Game value
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//Assign min max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event
//mousedown sẽ dừng lại, click sẽ thực hiện load lại luôn
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);
    //Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    } else {
        //Check won
        if (guess === winningNum) {
            gameOver(true, `${winningNum} is correct, YOU WON!`)

        } else {
            guessesLeft--;
            if (guessesLeft === 0) {
                //Lose
                gameOver(false, `Game over, YOU LOST! The correct number was ${winningNum}`)
            } else {
                //Continues
                setMessage(`${guess} is not correct, you have ${guessesLeft} gueses left`, 'red');
                guessInput.style.borderColor = 'red';
                guessInput.value = '';
            }
        }
    }

});

//Set message 
function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}

//Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg);
    //Play again
    guessBtn.value = 'Play again';
    guessBtn.className += 'play-again';
}

//Random winning num
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}