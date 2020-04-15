/* overview functions
DEFAULT add event listeners to buttons
(0-a) function excecuted when "restart" button is pressed
(0-b) function excecuted when "guess" button is pressed
(1) starten van game dmv kiezen van het woord 
(2) checken of letter voorkomt in het woord 
(3) updaten aantal pogingen 
(4) updaten van de lijst met letters die al geraden zijn door de gebruiker 
(5) verliezen van de game wanneer er geen pogingen meer over zijn 
(6) winnen van de game
(7) update correct letters 
(8) update wrong letters 
(9) display correct/wrong
(10) build puppet when picking wrong letter
*/

// initialize ALL global variables here
let pickedWord;
let guessedLetters;
let tries = 0;
let gameOver;
let correctLetters;
let wrongLetters;

// allTheWords = []
const wordList = [
  "vis",
  "toeter",
  "developer",
  "telefoon",
  "moeder",
  "snoer",
  "geeuw",
];

// (1) starten van game dmv kiezen van het woord
const wordPicker = (wordList) => {
  let index = Math.floor(Math.random() * wordList.length);
  return wordList[index];
};

// (2)(3) checken of letter voorkomt in het woord + updaten aantal pogingen
const checkStatus = (newLetter, pickedWord, guessedLetters) => {
  if (pickedWord.includes(newLetter)) {
    updateCorrectLetters(pickedWord, guessedLetters);
    return tries;
  } else {
    tries++;
    updateWrongLetters(pickedWord, guessedLetters);
    return tries;
  }
};

// (4) updaten van de lijst met letters die al geraden zijn door de gebruiker
const updateGuessedLetters = (guessedLetters, newLetter) => {
  if (guessedLetters.includes(newLetter)) {
    return guessedLetters;
  } else {
    guessedLetters.push(newLetter);
    return guessedLetters;
  }
};

// (5) verliezen van de game wanneer er geen pogingen meer over zijn
const loseTheGame = (tries) => {
  if (tries >= 8) {
    gameOver = true;
    tries = 0;
    return true;
  } else {
    gameOver = false;
    return false;
  }
};

// (6) winnen van de game
const winTheGame = (pickedWord, guessedLetters) => {
  let remaining = pickedWord.filter((letter) => {
    // if the letter is guessed return true
    return !guessedLetters.includes(letter);
  });
  // if all letters are guessed
  return remaining.length === 0;
};

// (7) update correct letters
const updateCorrectLetters = (pickedWord, guessedLetters) => {
  correctLetters = pickedWord.map((letter) => {
    if (guessedLetters.includes(letter)) {
      return letter;
    } else {
      return "_";
    }
  });
  return correctLetters;
};

// (8) update wrong letters
const updateWrongLetters = (pickedWord, guessedLetters) => {
  wrongLetters = guessedLetters.filter((letter) => {
    return !pickedWord.includes(letter);
  });
  return wrongLetters;
};

// (9) display correct/wrong letters
const displayLetters = () => {
  document.querySelector(".the_word").innerHTML = correctLetters.join(" ");
  document.querySelector(".guessed_letters").innerHTML = wrongLetters.join(" ");
  document.querySelector(".lives span").innerHTML = 8 - tries;
};

// (10) build puppet when picking wrong letter
const buildPuppet = (tries) => {
  switch (tries) {
    case 0:
      break;
    case 1:
      document.querySelector("#platform").style.display = "block";
      document.querySelector("#platform").classList.add("platformTrans");
      break;
    case 2:
      document.querySelector("#post").style.display = "block";
      document.querySelector("#post").classList.add("postTrans");
      break;
    case 3:
      document.querySelector("#bar").style.display = "block";
      document.querySelector("#bar").classList.add("barTrans");
      break;
    case 4:
      document.querySelector("#rope").style.display = "block";
      document.querySelector("#rope").classList.add("ropeTrans");
      break;
    case 5:
      document.querySelector("#head").style.display = "block";
      document.querySelector("#head").classList.add("shape");
      break;
    case 6:
      document.querySelector("#torso").style.display = "block";
      document.querySelector("#torso").classList.add("torsoTrans");
      break;
    case 7:
      document.querySelector("#right-arm").style.display = "block";
      document.querySelector("#left-arm").style.display = "block";
      document.querySelector("#right-arm").classList.add("limbTrans");
      document.querySelector("#left-arm").classList.add("limbTrans");
      break;
    case 8:
      document.querySelector("#right-leg").style.display = "block";
      document.querySelector("#left-leg").style.display = "block";
      document.querySelector("#right-leg").classList.add("limbTrans");
      document.querySelector("#left-leg").classList.add("limbTrans");
      break;
  }
};

// (0-b) click "guess" button
const guessLetter = () => {
  // when gameover is true, guess button does NOT work anymore
  if (gameOver === true) {
    return;
  }

  // select the current input + clear inputfiel
  const newLetter = document.querySelector("input").value;
  document.querySelector("input").value = "";

  // nothing happens when empty field / already guessed letter
  if (newLetter === "" || guessedLetters.includes(newLetter)) {
    return;
  } else {
    // call function (4) add letter to list of guessed letters
    updateGuessedLetters(guessedLetters, newLetter);

    // call function (2 + 3) update tries + check if letter is correct/wrong (7 + 8)
    checkStatus(newLetter, pickedWord, guessedLetters);

    // build puppet (10)
    buildPuppet(tries);

    // displaycorrect/wrong letters (9)
    displayLetters();

    if (winTheGame(pickedWord, guessedLetters)) {
      document.querySelector(".win").style.display = "block";
      document.querySelector("#hangman-container").style.display = "none";
      gameOver = true;
    }

    if (loseTheGame(tries)) {
      document.querySelector(".lose").style.display = "block";
      document.querySelector("#hangman-container").style.display = "none";
    }
  }
};

// (0-a) click "restart" button
const startGame = () => {
  // call function (1) - choose a random word and split characters
  pickedWord = wordPicker(wordList).split("");
  console.log(pickedWord);

  // reset variables
  gameOver = false;
  tries = 0;
  guessedLetters = [];

  // reset UI
  document.querySelector(".win").style.display = "none";
  document.querySelector(".lose").style.display = "none";
  document.querySelector("#hangman-container").style.display = "block";
  document.querySelector("input").value = "";
  document.querySelector(".lives span").innerHTML = 5;
  document.querySelector(".lose p span").innerHTML = `"${pickedWord.join("")}"`;
  document.querySelectorAll(".puppet").forEach((item) => {
    item.style.display = "none";
  });

  // update + display correct/wrong letters
  updateCorrectLetters(pickedWord, guessedLetters);
  updateWrongLetters(pickedWord, guessedLetters);
  displayLetters();
};

// DEFAULT add event listeners to buttons
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".guess").addEventListener("click", guessLetter);
  document.querySelector(".restart").addEventListener("click", startGame);
  startGame();
});

module.exports = {
  wordList,
  wordPicker,
  checkStatus,
  updateCorrectLetters,
  updateWrongLetters,
  displayLetters,
  startGame,
  loseTheGame,
  winTheGame,
  updateGuessedLetters,
};
