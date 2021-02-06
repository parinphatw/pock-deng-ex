const { expect } = require("@jest/globals");
const Cards = require("../utils/card");

test("Draw cards to the player and the dealer", () => {
  let cards = Cards.cards;
  console.log(cards);
  let cardsPicked = Cards.pickCards(cards);
  for (let i = 0; i < 2; i++) {
    expect(cardsPicked[0][i]).toBe(cards[2 * i]);
    expect(cardsPicked[1][i]).toBe(cards[2 * i + 1]);
  }
});
