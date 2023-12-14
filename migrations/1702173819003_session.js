/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("sessions", {
    sid: {
      type: "varchar",
      notNull: true,
      collation: "",
    },
    sess: {
      type: "jsonb",
      notNull: true,
    },
    expire: {
      type: "timestamp",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("session");
};
