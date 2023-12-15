const fp = require('fastify-plugin')
const Database = require('../db/database')
function fastifyRethinkdb(fastify, options, done) {
  
  //const r = require('rethinkdbdash')(options)
  const r = new Database(options)
  if (!fastify.rethinkdb) {
    fastify.decorate('rethinkdb', r)
  }

  fastify.addHook('onClose', (fastify, done) => connection.close().then(done).catch(done))

  done()
}

module.exports=fp(fastifyRethinkdb, { name: 'fastify-rethinkdb' })