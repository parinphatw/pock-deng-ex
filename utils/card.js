// start of cards
let suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let cards = [];
for (let s = 0; s < suits.length; s++) {
  for (let n = 0; n < values.length; n++) {
    cards.push(suits[s] + "-" + values[n]);
  }
}

// functions
function shuffle(cards) {
  // for 1000 turns
  // switch the values of two random cards
  for (let i = 0; i < 1000; i++) {
    let location1 = Math.floor(Math.random() * cards.length);
    let location2 = Math.floor(Math.random() * cards.length);
    let tmp = cards[location1];

    cards[location1] = cards[location2];
    cards[location2] = tmp;
  }

  return cards;
}

function pickCards(cards) {
  let player_cards = [];
  let dealer_cards = [];

  for (let i = 0; i < 4; i++) {
    if (i % 2 === 0) player_cards.push(cards[i]);
    else dealer_cards.push(cards[i]);
  }
  return [player_cards, dealer_cards];
}

module.exports = { cards, shuffle, pickCards };
