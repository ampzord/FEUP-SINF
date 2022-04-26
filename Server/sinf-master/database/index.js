const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const AgendaModel = require('./models/agenda')

const sequelize = new Sequelize('tubolime', 'admin', 'sqladmin', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  storage: 'database/database.sqlite'
})

const User = UserModel(sequelize, Sequelize)
const Agenda = AgendaModel(sequelize, Sequelize)

Agenda.belongsTo(User)

sequelize
  .authenticate()
  .then(() => {
    console.log('SQLite connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  })

sequelize
  .sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
    User.bulkCreate([
      { name: 'Ricardo Fonseca', username: 'rfonseca', password: 'sinfefixe', primavera_id: 'rfo' },
      { name: 'Miguel Moreira', username: 'mmoreira', password: 'sinfemuitofixe', primavera_id: 'mmo' },
      { name: 'André Durães', username: 'aduraes', password: 'password', primavera_id: 'adu' }
    ])

    Agenda.bulkCreate([
      { client_id: 'C0005', client_name: 'Barboflex Lda', client_address: 'Rua Conselheiro João Cunha 60', todo: "Mostrar novo produto X. Promover nova campanha na mangueira de lavagem", visit_date: '2018-12-20T09:00:00.000Z', userId: 3 },
      { client_id: 'C0005', client_name: 'Barboflex Lda', client_address: 'Avenida António Salazar Palácio 71', todo: "Mostrar novo produto X. Promover nova campanha na mangueira de lavagem", visit_date: '2018-12-20T09:12:00.000Z', report: 'Gostou muito. Vamos fazer algumas propostas.', userId: 1, done: true }
    ])
  })

module.exports = {
  User,
  Agenda,
  sequelize
}