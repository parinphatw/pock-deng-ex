const Cards = require("./card");
const Manage = require("./manage");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//global (initialize once)
let player_chips = 0;
let cards = Cards.cards;

// questions
const betQuestion = () => {
  return new Promise((resolve, reject) => {
    rl.question("Please put your bet\n>", (bet) => {
      playerBet = parseInt(bet);
      // console.log("Player bet: ", playerBet);
      cards = Cards.shuffle(cards);
      [player_cards, dealer_cards] = Cards.pickCards(cards);

      console.log(`You got ${player_cards[0]}, ${player_cards[1]}`);
      console.log(`The dealer got ${dealer_cards[0]}, ${dealer_cards[1]}`);

      let winner = Manage.calculateWinner(player_cards, dealer_cards);

      player_chips = Manage.calculateBalance(winner, player_chips, playerBet);

      resolve();
    });
  });
};

const continueQuestion = () => {
  return new Promise((resolve, reject) => {
    rl.question("Wanna play more?\n>", (ans) => {
      if (ans == "yes") {
        main();
      } else {
        console.log(`You got total ${player_chips} chip(s).`);
        rl.close();
      }

      resolve();
    });
  });
};

// main process
async function main() {
  // reinitialize every loop
  let player_cards;
  let dealer_cards;
  let playerBet = 0;
  cards = Cards.cards;

  await betQuestion();
  await continueQuestion();
}

module.exports = { main };
