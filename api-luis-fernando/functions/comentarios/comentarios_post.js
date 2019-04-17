const mysql = require('../../lib/mysql')
const util = require('../../lib/util')

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')

    const insert = await mysql.query('insert into comentarios (id, comentario, dataHora, id_usuarios, id_posts) values (?,?,?,?,?)', [body.id, body.comentario, body.dataHora, body.id_usuarios, body.posts])
    return util.bind(insert)
  } catch (error) {
    return util.bind(error)
  }
}
