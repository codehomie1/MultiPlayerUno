/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("users", {
        id: "id",
        username: {
          type: "varchar(256)",
          notNull: true,
          unique: true,
        },
        email: {
          type: "varchar(256)",
          notNull: true,
          unique: true,
        },
        password: {
          type: "varchar(60)",
          notNull: true,
        },
        created_at: {
          type: "timestamp",
          notNull: true,
          default: pgm.func("current_timestamp"),
        },
      });

    pgm.createTable("lobby_chat", {
      id: "id",
      username: {
        type: "text",
        notNull: true,
      },
      message: {
        type: "text",
        notNull: true,
      },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    });

    pgm.createTable("games", {
      id: "id",
      game_title: {
        type: "varchar(255)",
        notNull: true,
      },
      ongoing: {
        type: "boolean",
        notNull: true,
      },
      top_deck: {
        type: "varchar(5)",
        notNull: true,
      },
      top_discard: {
        type: "varchar(5)",
        notNull: true,
      },
      position: {
        type: "integer",
        notNull: true,
      },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    });

    pgm.createTable("user_cards", {
      // From the docs, "id" is equivalent to: { type: 'serial', primaryKey: true }
      game_id: {
        type: "int",
        notNull: true,
      },
      user_id: {
        type: "int",
        notNull: true,
      },
      card_id: {
        type: "int",
        notNull: true,
      },
    });

    pgm.createTable("uno_cards", {
      card_id: "id",

      card_color: {
        type: "integer",
        notNull: true,
      },
      card_number: {
        type: "integer",
        notNull: true,
      },
    });

};

exports.down = pgm => {
    pgm.dropTable("lobby_chat");
    pgm.dropTable("users");
    pgm.dropTable("games");
    pgm.dropTable("uno_cards");
    pgm.dropTable("user_cards");
};
