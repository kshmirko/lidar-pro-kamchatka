require('dotenv').config()
const multipart = require('@fastify/multipart')

const fastify = require('fastify')({
    logger:true
})

fastify.register(require('./plugins/rethinkdb-plugin'), {
    host: process.env.RETHINKDB_HOST,
    port: process.env.RETHINKDB_PORT,
    db: process.env.RETHINKDB_DB,
    user: process.env.RETHINKDB_USER,
    password: process.env.RETHINKDB_PASS
})

fastify.register(multipart)
fastify.register(require('./routes/experiments-route'), { prefix: '/v1' })

fastify.listen({ port: process.env.APP_PORT }, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})
