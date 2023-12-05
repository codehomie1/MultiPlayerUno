/* eslint-disable camelcase */

exports.shorthands = undefined;

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 *
 *  a change to the db structure
 */
exports.up = (pgm) => {
  pgm.createTable("test_table", {
    id: "id",
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    test_string: {
      type: "varchar(1000)",
      notNull: true,
    },
  });
};

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 *
 *  this is to undo the change to the database structure
 */
exports.down = (pgm) => {
  pgm.dropTable("test_table");
};
