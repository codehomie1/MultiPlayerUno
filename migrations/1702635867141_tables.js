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

};

exports.down = pgm => {
    pgm.dropTable("lobby_chat");
    pgm.dropTable("users");
};
