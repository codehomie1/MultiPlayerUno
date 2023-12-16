const db = require("./db.js");

const cards = [
  { card_color: 0, card_number: 0 },
  { card_color: 0, card_number: 1 },
  { card_color: 0, card_number: 2 },
  { card_color: 0, card_number: 3 },
  { card_color: 0, card_number: 4 },
  { card_color: 0, card_number: 5 },
  { card_color: 0, card_number: 6 },
  { card_color: 0, card_number: 7 },
  { card_color: 0, card_number: 8 },
  { card_color: 0, card_number: 9 },
  { card_color: 0, card_number: 10 },
  { card_color: 0, card_number: 11 },
  { card_color: 0, card_number: 12 },
  { card_color: 0, card_number: 1 },
  { card_color: 0, card_number: 2 },
  { card_color: 0, card_number: 3 },
  { card_color: 0, card_number: 4 },
  { card_color: 0, card_number: 5 },
  { card_color: 0, card_number: 6 },
  { card_color: 0, card_number: 7 },
  { card_color: 0, card_number: 8 },
  { card_color: 0, card_number: 9 },
  { card_color: 0, card_number: 10 },
  { card_color: 0, card_number: 11 },
  { card_color: 0, card_number: 12 },
  { card_color: 1, card_number: 0 },
  { card_color: 1, card_number: 1 },
  { card_color: 1, card_number: 2 },
  { card_color: 1, card_number: 3 },
  { card_color: 1, card_number: 4 },
  { card_color: 1, card_number: 5 },
  { card_color: 1, card_number: 6 },
  { card_color: 1, card_number: 7 },
  { card_color: 1, card_number: 8 },
  { card_color: 1, card_number: 9 },
  { card_color: 1, card_number: 10 },
  { card_color: 1, card_number: 11 },
  { card_color: 1, card_number: 12 },
  { card_color: 1, card_number: 1 },
  { card_color: 1, card_number: 2 },
  { card_color: 1, card_number: 3 },
  { card_color: 1, card_number: 4 },
  { card_color: 1, card_number: 5 },
  { card_color: 1, card_number: 6 },
  { card_color: 1, card_number: 7 },
  { card_color: 1, card_number: 8 },
  { card_color: 1, card_number: 9 },
  { card_color: 1, card_number: 10 },
  { card_color: 1, card_number: 11 },
  { card_color: 1, card_number: 12 },
  { card_color: 2, card_number: 0 },
  { card_color: 2, card_number: 1 },
  { card_color: 2, card_number: 2 },
  { card_color: 2, card_number: 3 },
  { card_color: 2, card_number: 4 },
  { card_color: 2, card_number: 5 },
  { card_color: 2, card_number: 6 },
  { card_color: 2, card_number: 7 },
  { card_color: 2, card_number: 8 },
  { card_color: 2, card_number: 9 },
  { card_color: 2, card_number: 10 },
  { card_color: 2, card_number: 11 },
  { card_color: 2, card_number: 12 },
  { card_color: 2, card_number: 1 },
  { card_color: 2, card_number: 2 },
  { card_color: 2, card_number: 3 },
  { card_color: 2, card_number: 4 },
  { card_color: 2, card_number: 5 },
  { card_color: 2, card_number: 6 },
  { card_color: 2, card_number: 7 },
  { card_color: 2, card_number: 8 },
  { card_color: 2, card_number: 9 },
  { card_color: 2, card_number: 10 },
  { card_color: 2, card_number: 11 },
  { card_color: 2, card_number: 12 },
  { card_color: 3, card_number: 0 },
  { card_color: 3, card_number: 1 },
  { card_color: 3, card_number: 2 },
  { card_color: 3, card_number: 3 },
  { card_color: 3, card_number: 4 },
  { card_color: 3, card_number: 5 },
  { card_color: 3, card_number: 6 },
  { card_color: 3, card_number: 7 },
  { card_color: 3, card_number: 8 },
  { card_color: 3, card_number: 9 },
  { card_color: 3, card_number: 10 },
  { card_color: 3, card_number: 11 },
  { card_color: 3, card_number: 12 },
  { card_color: 3, card_number: 1 },
  { card_color: 3, card_number: 2 },
  { card_color: 3, card_number: 3 },
  { card_color: 3, card_number: 4 },
  { card_color: 3, card_number: 5 },
  { card_color: 3, card_number: 6 },
  { card_color: 3, card_number: 7 },
  { card_color: 3, card_number: 8 },
  { card_color: 3, card_number: 9 },
  { card_color: 3, card_number: 10 },
  { card_color: 3, card_number: 11 },
  { card_color: 3, card_number: 12 },
  { card_color: 4, card_number: 13 },
  { card_color: 4, card_number: 14 },
  { card_color: 4, card_number: 13 },
  { card_color: 4, card_number: 14 },
  { card_color: 4, card_number: 13 },
  { card_color: 4, card_number: 14 },
  { card_color: 4, card_number: 13 },
  { card_color: 4, card_number: 14 },
];

cards.forEach((card) => {
  const { card_color, card_number } = card;
  const query = {
    text: 'INSERT INTO uno_cards (card_color, card_number) VALUES ($1, $2)',
    values: [card_color, card_number]
  };
  db.query(query)
    .then(() => console.log(`Inserted card ${card_color}-${card_number} into the cards table`))
    .catch(err => console.error(err.stack));
});

  