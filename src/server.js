const fastify = require('fastify')({
    logger:true
})

fastify.register(require('./plugins/rethinkdb-plugin'), {
    host: 'lidarbackup.dvo.ru',
    port: 28015,
    db: 'Lidar',
    user: 'lidar_user',
    password: 'lidar_user'
})


fastify.get('/tables', async (request, reply)=>{
    return await fastify.rethinkdb.findAllExperiments()
})

fastify.register(require('./routes/experiments-route'), { prefix: '/v1' })

fastify.listen({ port: 3000 }, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})
