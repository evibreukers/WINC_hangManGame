// Initialize ALL global variables here

// allTheWords = []
const wordList = [
  "vis",
  "toeter",
  "developer",
  "telefoon",
  "moeder",
  "snoer",
  "geeuw"
];

// FUNCTION: select word from wordList
const wordPicker = (wordList) => {
  let index = Math.floor(Math.random() * wordList.length);
  return wordList[index];
};
 
// FUNCTION: check if whole word is guessed
const wordGuessed = (pickedWord, guessedLetters) => {
  // make an array of remaining (not guessed) letters 
  let remaining = pickedWord.filter(letter => {
    // if the letter is guessed return true 
    return !guessedLetters.includes(letter);
  });
  // if all letters are guessed
  return remaining.length === 0;
};
  
// FUNCTION: win the game
const winTheGame = () => {
  document.querySelector(".win").style.display = "block";
  gameOver = true;
};

// FUNCTION: lose the game
const loseTheGame = () => {
  document.querySelector(".lose").style.display = "block";
  gameOver = true;
};

// FUNCTION: display wrong letters
const displayWrongLetters = (pickedWord, guessedLetters) => {
  let wrongLetters = guessedLetters.filter(letter => {
    // If the letter is in the word return.... false/true (we want to remove that then)
    return !pickedWord.includes(letter);
  });
  document.querySelector(".guessed_letters").innerHTML = wrongLetters.join(" ");
};
  
// FUNCTION: display result (correct letters)
const displayResult = (pickedWord, guessedLetters) => {
  let result = pickedWord.map(letter => {
    if (guessedLetters.includes(letter)) {
      return letter;
    } else {
      return "_";
    }
  });
  document.querySelector(".the_word").innerHTML = result.join(" ");
};

// FUNCTION is excecuted when "guess" button is pressed
const guessLetter = () => {
  if (gameOver) {
    console.log('game over');
  }

  // select the current input + clear inputfiel
  const newLetter = document.querySelector("input").value;
  document.querySelector("input").value = "";

  // check status of newLetter
  if (guessedLetters.includes(newLetter)) {
    console.log('this letter has already been guessed');
  } else if (newLetter === "") {
    console.log('no input')
  } else if (!pickedWord.includes(newLetter)) {
    tries++;
    document.querySelector(".lives span").innerHTML = 5 - tries;
    // add newLetter to guessedLetters
    guessedLetters.push(newLetter);
  }

  // update result (correct letters)
  displayResult(pickedWord, guessedLetters);
  // update wrong letters
  displayWrongLetters(pickedWord, guessedLetters);

  if (wordGuessed(pickedWord, guessedLetters)) {
    winTheGame();
  } else if (tries >= 5) {
    loseTheGame();
  }
};

/* FUNCTION: select the player
function getThePlayer() {
  let play = document.getElementById("player1");
  play = play + "We are about to start the game";
  return play;
} */

// FUNCTION: 
const beginTheGameWithPlayer = (player1) => {
  /* getThePlayer(player1); */
  gameOver = false;
  document.querySelector(".win").style.display = "none";
  document.querySelector(".lose").style.display = "none";
  document.querySelector("input").value = "";

  // choose a random word and split characters
  pickedWord = wordPicker(wordList).split("");
  document.querySelector(".lose p span").innerHTML = `"${pickedWord.join("")}"`;

  // set remaining lives
  tries = 0;
  document.querySelector(".lives span").innerHTML = 5;

  // clear inputs
  guessedLetters = [];
  displayResult(pickedWord, guessedLetters);
  displayWrongLetters(pickedWord, guessedLetters);
}

// DEFAULT
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".guess").addEventListener("click", guessLetter);
  document.querySelector(".restart").addEventListener("click", beginTheGameWithPlayer);
  beginTheGameWithPlayer();
});
