module.exports = (sequelize, type) => {
  return sequelize.define('agenda', {
    id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
    client_id: { type: type.STRING, allowNull: false },
    client_name: { type: type.STRING, allowNull: false },
    client_address: { type: type.STRING, allowNull: false },
    todo: { type: type.TEXT, allowNull: false },
    visit_date: { type: type.DATE, allowNull: false },
    done: { type: type.BOOLEAN, allowNull: false, defaultValue: false },
    report: type.TEXT
  })
}