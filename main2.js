let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w; // = width / 3;
let h; // = height / 3;

let ai = 'X';
let human = 'O';
let currentPlayer = human;

function setup() {
  // Create the canvas and set up the title
  createCanvas(600, 600);
  w = width / 3;
  h = height / 3;
  
  // Create and style the title
  let title = createP('The Unbeatable AI');
  title.style('font-size', '32pt');
  title.style('text-align', 'center');
  title.style('margin-bottom', '10px');
  title.style('color', '#333');
  

}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function mousePressed() {
  if (currentPlayer == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == '') {
      board[i][j] = human;
      currentPlayer = ai;
      bestMove();
    }
  }
}

function draw() {
  background(240);

  // Grid lines
  strokeWeight(6);
  stroke(50, 50, 200);
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  // Draw X and O
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      let r = w / 4;

      textSize(64);
      textAlign(CENTER, CENTER);

      if (spot == human) {
        stroke(50, 200, 50);
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == ai) {
        stroke(200, 50, 50);
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  // Check for winner
  let result = checkWinner();
  if (result != null) {
    noLoop();
    
    // Create a paragraph for the result and position it below the canvas
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    resultP.style('color', '#333');
    resultP.style('text-align', 'center');
    resultP.style('margin-top', '20px');  // Ensure it's below the canvas
    if (result == 'tie') {
      resultP.html('It\'s a Tie!');
    } else {
      resultP.html(`${result} Wins!`);
    }
  }
}
