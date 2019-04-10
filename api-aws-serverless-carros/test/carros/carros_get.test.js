require('dotenv').config()
const mongodb = require('../../lib/mongodb')
const { ObjectId } = require('mongodb')
const carrosGet = require('./../../functions/carros/carros_get')

const collectionCarros = 'carros'

describe('carros/carros_get.js', () => {
  beforeAll(async () => {
    try {
      await mongodb.connect()
      await mongodb(collectionCarros).insertOne({ placa: 'LFG1502', _id: ObjectId('5c326feaf8a79d378757bed0') })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  afterAll(async () => {
    try {
      await mongodb(collectionCarros).removeOne({ placa: 'LFG1502' })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  describe('Should success', () => {
    it('return all carros', async () => {
      const event = {}
      const res = await carrosGet(event)
      const body = JSON.parse(res.body)
      expect(res.statusCode).toBe(200)
      expect(body.length).toBeGreaterThanOrEqual(1)
    })
    it('return an carro', async () => {
      const event = {
        pathParameters: {
          id: '5c326feaf8a79d378757bed0'
        }
      }
      const res = await carrosGet(event)
      const body = JSON.parse(res.body)
      expect(res.statusCode).toBe(200)
      expect(body.placa).toBe('LFG1502')
    })
    it('return secoend page', async () => {
      const event = {
        queryStringParameters: {
          page: 2
        }
      }
      const res = await carrosGet(event)
      expect(res.statusCode).toBe(200)
    })
  })
  describe('Should fail', () => {
    it('should return an error event not send', async () => {
      const res = await carrosGet()
      expect(res.statusCode).toBe(400)
    })
  })
})
