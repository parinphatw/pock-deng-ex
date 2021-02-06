const { DefaultDeserializer } = require("v8");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// start of cards
let suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let cards = [];
for (let s = 0; s < suits.length; s++) {
  for (let n = 0; n < values.length; n++) {
    cards.push(suits[s] + "-" + values[n]);
  }
}

// console.log(cards);
// end of cards

// functions
function shuffle() {
  // for 1000 turns
  // switch the values of two random cards
  for (let i = 0; i < 1000; i++) {
    let location1 = Math.floor(Math.random() * cards.length);
    let location2 = Math.floor(Math.random() * cards.length);
    let tmp = cards[location1];

    cards[location1] = cards[location2];
    cards[location2] = tmp;
  }

  //   console.log(cards);
}

function pickCards() {
  for (let i = 0; i < 4; i++) {
    if (i % 2 === 0) player_cards.push(cards[i]);
    else dealer_cards.push(cards[i]);
  }
  console.log(`You got ${player_cards[0]}, ${player_cards[1]}`);
  console.log(`The dealer got ${dealer_cards[0]}, ${dealer_cards[1]}`);
}

function calculateWinner(player_cards, dealer_cards) {
  let player_scores = player_cards.map((card) => card.split("-")[1]);
  let dealer_scores = dealer_cards.map((card) => card.split("-")[1]);
  //   console.log(player_scores, dealer_scores);
  let player_final_score = calculateScore(player_scores);
  let dealer_final_score = calculateScore(dealer_scores);

  //check who has greater score
  if (player_final_score > dealer_final_score) return "player";
  else if (player_final_score < dealer_final_score) return "dealer";
  return "tie";
}

function calculateScore(scores) {
  let final_score = 0;
  for (let i = 0; i < 2; i++) {
    if (scores[i] === "A") final_score += 1;
    else {
      let s;
      s = parseInt(scores[i]);
      if (!Number.isNaN(s)) final_score += s;
    }
  }
  final_score = final_score % 10;
  return final_score;
}

function calculateBalance(winner, player_chips, playerBet) {
  if (winner === "player") {
    console.log(`You won!!!, received ${playerBet} chip(s)`);
    return player_chips + playerBet;
  } else if (winner === "dealer") {
    console.log(`You lose!!!, lost ${playerBet} chip(s)`);
    return player_chips - playerBet;
  } else if (winner === "tie") {
    console.log(`It's a tie!!!, no lose no gain`);
    return player_chips;
  }
}

// main logic
let player_chips = 0;
let player_cards = [];
let dealer_cards = [];
let playerBet = 0;

readline.question("Please put your bet\n>", (bet) => {
  playerBet = bet;
  shuffle();
  pickCards();
  let winner = calculateWinner(player_cards, dealer_cards);

  player_chips = calculateBalance(winner, player_chips, playerBet);

  readline.close();
});
