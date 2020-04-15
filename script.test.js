const functions = require("./script.js");

beforeAll(() => {
  console.log("started testing");
});

afterAll(() => {
  console.log("finished testing");
});

// (1) wordPicker
describe("wordPicker", () => {
  beforeAll(() => {
    console.log("testing wordPicker function");
  });

  test("starting game by picking a word, word from list", () => {
    const wordList = functions.wordList;
    const pickedWord = functions.wordPicker(wordList);
    expect(wordList).toContain(pickedWord);
  });

  test("starting game by picking a word, word NOT in list", () => {
    const wordList = functions.wordList;
    const pickedWord = "random";
    expect(wordList).not.toContain(pickedWord);
  });
});

// (2)(3) checkStatus
describe("checkStatus", () => {
  beforeAll(() => {
    console.log("testing checkStatus function");
  });

  test("update number of tries, if correct letter +0", () => {
    const letter = "r";
    const guessedLetters = ["z", "d", "c"];
    const pickedWord = "random".split("");
    expect(functions.checkStatus(letter, pickedWord, guessedLetters)).toBe(0);
  });

  test("update number of tries, if wrong letter +1", () => {
    const letter = "g";
    const guessedLetters = ["z", "d", "c"];
    const pickedWord = "random".split("");
    expect(functions.checkStatus(letter, pickedWord, guessedLetters)).toBe(1);
  });
});

// (4) updateGuessedLetters
describe("updateGuessedLetters", () => {
  beforeAll(() => {
    console.log("testing updateGuessedLetters function");
  });

  test("check if the new letter was already guessed by the user, not guessed yet", () => {
    const letter = "a";
    const guessedLetters = ["z", "d", "c"];
    expect(functions.updateGuessedLetters(guessedLetters, letter)).toContain(
      letter
    );
  });

  test("check if the new letter was already guessed by the user, already guessed", () => {
    const letter = "z";
    const guessedLetters = ["z", "d", "c"];
    expect(functions.updateGuessedLetters(guessedLetters, letter)).toContain(
      letter
    );
  });
});

// (5) loseTheGame
describe("loseTheGame", () => {
  beforeAll(() => {
    console.log("testing loseTheGame function");
  });

  test("check if tries >=8 and game is over, happy path", () => {
    const tries = 9;
    expect(functions.loseTheGame(tries)).toBe(true);
  });

  test("check if tries >=8 and game is over, false path", () => {
    const tries = 0;
    expect(functions.loseTheGame(tries)).toBe(false);
  });
});

// (6) winTheGame
describe("winTheGame", () => {
  beforeAll(() => {
    console.log("testing winTheGame function");
  });

  test("check if all the letters are guessed an game is won, happy path, ", () => {
    const pickedWord = "random".split("");
    const guessedLetters = ["r", "a", "n", "d", "o", "m"];
    expect(functions.winTheGame(pickedWord, guessedLetters)).toBe(true);
  });

  test("check if all the letters are guessed an game is won, false path", () => {
    const pickedWord = "random".split("");
    const guessedLetters = ["r", "a", "n", "d", "o"];
    expect(functions.winTheGame(pickedWord, guessedLetters)).toBe(false);
  });
});

// (7) updateCorrectLetters
describe("updateCorrectLetters", () => {
  beforeAll(() => {
    console.log("testing updateCorrectLetters function");
  });

  test("update array of correct letters with new letter", () => {
    const guessedLetters = ["z", "d", "c"];
    const pickedWord = "random".split("");
    const output = functions.updateCorrectLetters(pickedWord, guessedLetters);
    expect(output).toEqual(["_", "_", "_", "d", "_", "_"]);
  });
});

// (8) updatWrongLetters
describe("winTheGame", () => {
  beforeAll(() => {
    console.log("testing updatWrongLetters function");
  });

  test("update array of wrong letters with new letter", () => {
    const guessedLetters = ["z", "d", "c"];
    const pickedWord = "random".split("");
    const output = functions.updateWrongLetters(pickedWord, guessedLetters);
    expect(output).toEqual(["z", "c"]);
  });
});
