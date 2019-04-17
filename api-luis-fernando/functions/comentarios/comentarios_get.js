const mysql = require('../../lib/mysql')
const util = require('../../lib/util')

module.exports = async (event) => {
  try {
    
    if (event.pathParameters && event.pathParameters.id) {
      const comentarios = await mysql.query('select id, comentario, dataHora, id_usuarios, id_posts from comentarios where id=?', [event.pathParameters.id])
      return util.bind(comentarios.length ? comentarios[0] : {})
    }

    const comentarios = await mysql.query('select id, comentario, dataHora, id_usuarios, id_posts from comentarios')
    return util.bind(comentarios)
  } catch (error) {
    return util.bind(error)
  }
}
