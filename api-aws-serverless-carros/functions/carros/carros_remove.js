const mongodb = require('../../lib/mongodb')
const util = require('../../lib/util')
const collectionCarros = 'carros'
const { ObjectId } = require('mongodb')

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')
    if (!body._id) return util.bind(new Error('Digite seu código!'))

    await mongodb.connect()

    await mongodb(collectionCarros).removeOne({ _id: ObjectId(body._id) })
    return util.bind({})
  } catch (error) {
    return util.bind(error)
  }
}
