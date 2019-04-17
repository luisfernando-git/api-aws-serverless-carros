const mysql = require('../../lib/mysql')
const util = require('../../lib/util')

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')

    const insert = await mysql.query('Insert into logs (id_usuarios, log, dataHora) values (?,?,?)', [body.id_usuarios, body.log, body.dataHora])
    return util.bind(insert)
  } catch (error) {
    return util.bind(error)
  }
}
