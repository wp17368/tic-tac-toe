// player field
// game matrix 3x3
// coordinates 2x1
// move button
// comms field
//display instructions
//
const EMPTY_CELL = " ";
let ticTacToe = [
  [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
  [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
  [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
];

const SIGN_X = "X";
const SIGN_O = "O";
let currentPlayer = SIGN_X;

function moveMaker() {
  let column = document.querySelector("#column-coordinate-input").value - 1;
  let row = document.querySelector("#row-coordinate-input").value - 1;
  let isNumber = validateIsNumber(column, row);
  if (isNumber === true) {
    alert("Please, only enter integers between 1 and 3");
  } else {
    let validCoordinates = validateCoordinates(column, row);
    if (validCoordinates === false) {
      alert("Only enter values between 1 and 3");
    } else {
      let isFieldEmpty = validateEmptyField(column, row);
      if (isFieldEmpty === false) {
        alert("This cell is taken. Please, pick an empty cell.");
      } else {
        pick(row, column, currentPlayer);
        displayGrid();
        if (checkWinner() != null) {
          swapButtonOnclickToReload();
          printWinner();
        } else {
          if (checkDraw() === true) {
            swapButtonOnclickToReload();
            printDraw();
          } else {
            switchPlayer();
            displayPlayer();
          }
        }
      }
    }
  }
}

function checkWinner() {
  rowScore = checkScoreRows();
  if (rowScore != null) {
    return rowScore;
  }
  columnScore = checkScoreColumns();
  if (columnScore != null) {
    return columnScore;
  }
  slantAScore = checkScoreSlantA();
  if (slantAScore != null) {
    return slantAScore;
  }
  slantBScore = checkScoreSlantB();
  if (slantBScore != null) {
    return slantBScore;
  }
  return null;
}
function printWinner() {
  document.querySelector(
    "#player"
  ).innerHTML = `Player ${currentPlayer} wins.<br>Press the button to restart.`;
}
function printDraw() {
  document.querySelector("#player").innerHTML = `There is a draw`;
}
function reloadPage() {
  location.reload();
}
function swapButtonOnclickToReload() {
  let button = document.querySelector("button");
  button.innerHTML = "Reload game";
  button.onclick = reloadPage;
}
function checkScoreSlantA() {
  let scoreX = 0;
  let scoreO = 0;
  let column = 0;
  for (let row = 0; row < ticTacToe.length; row++) {
    if (ticTacToe[row][column] === SIGN_X) {
      scoreX++;
    } else if (ticTacToe[row][column] === SIGN_O) {
      scoreO++;
    } else {
      return null;
    }
    column++;
  }
  if (scoreX === 3) {
    return SIGN_X;
  }
  if (scoreO === 3) {
    return SIGN_O;
  }
}
function checkScoreSlantB() {
  let scoreX = 0;
  let scoreO = 0;
  let column = 2;
  for (let row = 0; row < ticTacToe.length; row++) {
    if (ticTacToe[row][column] === SIGN_X) {
      scoreX++;
    } else if (ticTacToe[row][column] === SIGN_O) {
      scoreO++;
    } else {
      return null;
    }
    column--;
  }
  if (scoreX === 3) {
    return SIGN_X;
  }
  if (scoreO === 3) {
    return SIGN_O;
  }
}
function checkScoreRows() {
  for (let row = 0; row < ticTacToe.length; row++) {
    let scoreX = 0;
    let scoreO = 0;
    for (let column = 0; column < ticTacToe.length; column++) {
      if (ticTacToe[row][column] === SIGN_O) {
        scoreO++;
      } else if (ticTacToe[row][column] === SIGN_X) {
        scoreX++;
      }
    }
    if (scoreX === 3) {
      return SIGN_X;
    } else if (scoreO === 3) {
      return SIGN_O;
    }
  }
  return null;
}

function checkScoreColumns() {
  for (let column = 0; column < ticTacToe.length; column++) {
    let scoreX = 0;
    let scoreO = 0;
    for (let row = 0; row < ticTacToe.length; row++) {
      if (ticTacToe[row][column] === SIGN_O) {
        scoreO++;
      } else if (ticTacToe[row][column] === SIGN_X) {
        scoreX++;
      } else {
        continue;
      }
    }
    if (scoreX === 3) {
      return SIGN_X;
    } else if (scoreO === 3) {
      return SIGN_O;
    }
  }
  return null;
}
function checkDraw() {
  for (let row = 0; row < ticTacToe.length; row++) {
    for (let column = 0; column < ticTacToe.length; column++) {
      if (ticTacToe[row][column] === " ") {
        return false;
      } else {
        continue;
      }
    }
  }
  return true;
}

function displayPlayer() {
  document.querySelector(
    "#player"
  ).innerHTML = `This move belongs to Player ${currentPlayer}`;
}

function pick(row, column, symbol) {
  ticTacToe[row][column] = symbol;
}

function validateCoordinates(column, row) {
  if (column < 0 || column > 2 || row < 0 || row > 2) {
    return false;
  } else {
    return true;
  }
}

function validateIsNumber(column, row) {
  if (isNaN(column) === true) {
    return true;
  } else if (isNaN(row) === true) {
    return true;
  }
}

function validateEmptyField(column, row) {
  if (ticTacToe[row][column] === EMPTY_CELL) {
    return true;
  } else {
    return false;
  }
}
function switchPlayer() {
  if (currentPlayer == `X`) {
    currentPlayer = `O`;
  } else {
    currentPlayer = `X`;
  }
}

function prepareHeader() {
  let header = `<thead>`;
  header += `<tr>`;
  header += `<th> </th>`;

  for (let column = 0; column < ticTacToe.length; column++) {
    header += `<th>${column + 1}</th>`;
  }
  header += `</tr>`;
  header += `</thead>`;
  return header;
}
function prepareBody() {
  let body = `<tbody>`;
  for (let row = 0; row < ticTacToe.length; row++) {
    body += `<tr>`;
    body += `<td id="row-number"> ${row + 1}</td>`;
    for (let column = 0; column < ticTacToe.length; column++) {
      preparePlaceSymbolFunction(row, column);
      body +=
        `<td class="field" id="cell-` +
        row +
        `-` +
        column +
        `" ` +
        `onclick="placeSymbol` +
        row +
        column +
        `()">` +
        ticTacToe[row][column] +
        `</td>`;
    }
    body += `</tr>`;
  }
  body += `</tbody>`;
  return body;
}
function prepareTable() {
  let table = `<table>`;
  table += prepareHeader();
  table += prepareBody();
  table += `</table>`;
  return table;
}
function displayGrid() {
  document.querySelector("#tic-tac-toe").innerHTML = prepareTable();
}
function preparePlaceSymbolFunction(row, column) {
  window[`placeSymbol` + row + column] = function () {
    document.querySelector("#row-coordinate-input").value = row + 1;
    document.querySelector("#column-coordinate-input").value = column + 1;
    moveMaker();
  };
}
