exports.up = function (knex) {
  return knex.schema.createTable('users',(table) => {
    table.increments("id").primary();
    table.string("name", 150).notNullable();
    table.string("email", 255).notNullable();
    table.string("password").notNullable();
    table.string("avatar_url", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
