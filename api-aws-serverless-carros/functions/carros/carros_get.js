const mongodb = require('../../lib/mongodb')
const util = require('../../lib/util')
const { ObjectId } = require('mongodb')
const collectionCarros = 'carros'

module.exports = async (event) => {
    try {
        await mongodb.connect()
        const perPage = 50
        const page = event.queryStringParameters && event.queryStringParameters.page ? event.queryStringParameters.page : 1

        if (event.pathParameters && event.pathParameters.id) {
            const carro = await mongodb(collectionCarros).findOne({ _id: ObjectId(event.pathParameters.id) })
            return util.bind(carro)
        }

        const carros = await mongodb(collectionCarros).find({}).skip(perPage * page - perPage).limit(perPage).toArray()
        return util.bind(carros)
    } catch (error) {
        return util.bind(error)
    }
}
