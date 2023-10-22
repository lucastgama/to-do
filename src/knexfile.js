module.exports = {
  client: "mysql2",
  connection: {
    database: "to_do",
    user: "root",
    password: "123456",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
