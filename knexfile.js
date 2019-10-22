// Update with your config settings.

module.exports = {
  client: 'mysql',
  connection: {
    database: 'desafio-cap-04',
    user:     'root',
    password: '123456789'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
