const mysql = require('../../lib/mysql')
const util = require('../../lib/util')

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')

    const insert = await mysql.query('Insert into posts (id, id_usuarios, titulo, imagem, dataHora) values (?,?,?,?,?)', [body.id, body.id_usuarios, body.titulo, body.imagem, body.dataHora])
    return util.bind(insert)
  } catch (error) {
    return util.bind(error)
  }
}
