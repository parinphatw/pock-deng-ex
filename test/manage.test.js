const { test } = require("@jest/globals");
const manage = require("../utils/manage");

test("calculate winner in case the player wins", () => {
  expect(
    manage.calculateWinner(["Diamonds-A", "Hearts-6"], ["Clubs-5", "Hearts-Q"])
  ).toBe("player");
});
