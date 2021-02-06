const { test, expect } = require("@jest/globals");
const manage = require("../utils/manage");

test("calculate winner in case the player wins", () => {
  expect(
    manage.calculateWinner(["Diamonds-A", "Hearts-6"], ["Clubs-5", "Hearts-Q"])
  ).toBe("player");
});

test("calculate winner in case the player loses", () => {
  expect(
    manage.calculateWinner(["Diamonds-A", "Hearts-2"], ["Clubs-5", "Hearts-Q"])
  ).toBe("dealer");
});

test("calculate winner in case the player ties", () => {
  expect(
    manage.calculateWinner(["Diamonds-A", "Hearts-6"], ["Clubs-5", "Hearts-2"])
  ).toBe("tie");
});

test("calculate balance of the player in case the player wins", () => {
  expect(manage.calculateBalance("player", 60, 30)).toBe(90);
});

test("calculate balance of the player in case the player loses", () => {
  expect(manage.calculateBalance("dealer", 60, 30)).toBe(30);
});

test("calculate balance of the player in case the player ties", () => {
  expect(manage.calculateBalance("tie", 60, 30)).toBe(60);
});
