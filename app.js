let playerSelection;
let computerSelection;
let playerScore = 0;
let computerScore = 0;
let roundNumber = 0;
//choices
const choices = ["rock", "paper", "scissors"];
const getComputerChoice = () => {
  return choices[Math.floor(Math.random() * choices.length)];
};
//create buttons
(() => {
  for (let choice of choices) {
    const button = document.createElement("button");
    button.innerHTML = choice;
    button.value = choice;
    document.body.appendChild(button);
  }
})();
//
const playRound = () => {
  //increase round nb
  roundNumber++;

  //messages
  const messageDefeat = `:( You Lose! (${computerSelection} beats ${playerSelection})`;
  const messageTie = `:| It's a Tie. You both chose ${playerSelection}`;
  const messageWin = `:) You Win! (${playerSelection} beats ${computerSelection})`;

  //logic
  if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    playerScore++;
    showMessage(messageWin);
  } else if (
    (computerSelection === "rock" && playerSelection === "scissors") ||
    (computerSelection === "paper" && playerSelection === "rock") ||
    (computerSelection === "scissors" && playerSelection === "paper")
  ) {
    computerScore++;
    showMessage(messageDefeat);
  } else if (computerSelection === playerSelection) {
    showMessage(messageTie);
  }
};

//get button value and launch round on click for each button
const buttonsArray = Array.from(document.getElementsByTagName("button"));
buttonsArray.forEach((element) => {
  element.addEventListener("click", () => {
    playerSelection = element.value;
    computerSelection = getComputerChoice();
    playRound(playerSelection, computerSelection);
  });
});

//Add a div for displaying results
const clearMessages = () => {
  const messageDivs = document.querySelectorAll(".message");
  messageDivs.forEach((messageDiv) => {
    messageDiv.remove();
  });
};
let showMessage = (message) => {
  clearMessages(); // Clear previous messages
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `---ROUND_${roundNumber}--Fight!--- <br><br>${message}<br><br>Score:_P(${playerScore}):C(${computerScore})`;

  if (playerScore === 5 || computerScore === 5) {
    if (playerScore === 5) {
      div.innerHTML = `Player Wins the game! (${playerScore}:${computerScore})`;
    } else if (playerScore === computerScore) {
      div.innerHTML = `It's a Tie in the game! (${playerScore}:${computerScore})`;
    } else {
      div.innerHTML = `Computer Wins the game! (${computerScore}:${playerScore})`;
    }
    // Reset scores and round number
    playerScore = 0;
    computerScore = 0;
    roundNumber = 0;
  }

  document.body.appendChild(div);
};
