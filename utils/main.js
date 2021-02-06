const Cards = require("./card");
const Manage = require("./manage");

function main() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // create cards
  let cards = Cards.cards;

  // main logic
  let player_chips = 0;
  let player_cards;
  let dealer_cards;
  let playerBet = 0;

  readline.question("Please put your bet\n>", (bet) => {
    playerBet = bet;
    cards = Cards.shuffle(cards);
    [player_cards, dealer_cards] = Cards.pickCards(cards);
    console.log(`You got ${player_cards[0]}, ${player_cards[1]}`);
    console.log(`The dealer got ${dealer_cards[0]}, ${dealer_cards[1]}`);

    let winner = Manage.calculateWinner(player_cards, dealer_cards);

    player_chips = Manage.calculateBalance(winner, player_chips, playerBet);

    readline.close();
  });

  readline.question("Wanna play more?\n>", (ans) => {
    if (ans == "Yes") {
      main();
    } else console.log(`You got total ${player_chips} chip(s).`);

    readline.close();
  });
}

module.exports = { main };
