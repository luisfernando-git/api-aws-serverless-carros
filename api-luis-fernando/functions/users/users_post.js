const mysql = require('../../lib/mysql')
const util = require('../../lib/util')

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')

    const insert = await mysql.query('insert into users (name, email, senha, ultimo_login, dataHora, token) values (?,?,?,?,?,?)', [body.name, body.email, body.senha, body.ultimo_login, body.dataHora, body.token])
    return util.bind(insert)
  } catch (error) {
    return util.bind(error)
  }
}
