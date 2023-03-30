// 1: Rock; 2: Paper; 3: Scissors
var playCount = 1;
var playerWin = 0;
var computerWin = 0;
var symbolsId = {
    1:"rock",
    2:"paper",
    3:"scissors",
};

function getComputerChoice() {
    return Math.floor(Math.random() * 3) + 1;
}

function updateRoundResult(playerSelection) {
    let computerSelection = getComputerChoice();
    let computerChoiceDisplay = document.querySelector("#computer-choice");
    computerChoiceDisplay.innerHTML = ''
    computerChoiceDisplay.appendChild(choiceImageDisplay(computerSelection));

    let playerChoiceDisplay = document.querySelector("#player-choice");
    playerChoiceDisplay.innerHTML = ''
    playerChoiceDisplay.appendChild(choiceImageDisplay(playerSelection));

    
    let roundResultDisplay = document.querySelector('#round-result');
    let difference = playerSelection - computerSelection;
    if (playerSelection === computerSelection) {
        roundResultDisplay.innerHTML = 'DRAW'
    } else if (difference == -2 || difference == 1) {
        roundResultDisplay.innerHTML = 'WIN'
        playerWin++
        playCount++
    } else {
        roundResultDisplay.innerHTML = 'LOSE'
        computerWin++
        playCount++
    }
    let playerWinDisplay = document.querySelector(".player-win");
    playerWinDisplay.innerHTML = playerWin;
    let computerWinDisplay = document.querySelector(".computer-win");
    computerWinDisplay.innerHTML = computerWin;
}


function playRound(playerSelection) {
    let playResultDisplay = document.querySelector("#play-count");
    updateRoundResult(playerSelection);
    if (playCount >= 7) {
        playResultDisplay.innerHTML = gameResult()
        playerWin = 0
        computerWin = 0
        playCount = 1
    } else if (playCount === 1) {
        document.querySelector('#vs').innerHTML = ''
    } else {
        document.querySelector('#vs').innerHTML = "vs"
    }
}

function gameResult() {
    if (playerWin > 3) {
        return `${playerWin}:${computerWin}\nYOU WIN!`
    } else if (playerWin == 3) {
        return `${playerWin}:${computerWin}\nIT'S A DRAW!`
    } else {
        return `${playerWin}:${computerWin}\nYOU LOSE!`
    }
}

function choiceImageDisplay(choice) {
    photo = document.createElement("img");
    photo.setAttribute("src", `img/${symbolsId[choice]}.png`);
    return photo;
}

document.addEventListener("DOMContentLoaded", function() {
    let playerButtons = document.querySelectorAll(".player-button img");
    let playResultDisplay = document.querySelector("#play-count");
    playerButtons.forEach(e => {
        e.addEventListener("click", function(){
            playResultDisplay.innerHTML = ''
            playRound(+e.id)
        })
    })
});