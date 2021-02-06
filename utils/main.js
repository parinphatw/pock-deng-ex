const Cards = require("./card");

function main() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // create cards
  let cards = Cards.cards;

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
  let player_cards;
  let dealer_cards;
  let playerBet = 0;

  readline.question("Please put your bet\n>", (bet) => {
    playerBet = bet;
    cards = Cards.shuffle(cards);
    [player_cards, dealer_cards] = Cards.pickCards(cards);
    console.log(`You got ${player_cards[0]}, ${player_cards[1]}`);
    console.log(`The dealer got ${dealer_cards[0]}, ${dealer_cards[1]}`);

    let winner = calculateWinner(player_cards, dealer_cards);

    player_chips = calculateBalance(winner, player_chips, playerBet);

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
