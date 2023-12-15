module.exports  =  function (fastify, opts, done) {
    
    fastify.get('/tables',async (request, reply)=>{    
        let tbls =  await fastify.rethinkdb.tables()
        return tbls
    })

    fastify.get('/experiments', async (req, rep)=>{
        return await fastify.rethinkdb.findAllExperiments()
    })

    fastify.get('/experiments/:id', async(req, rep)=>{
        const {id} = req.params
        console.log(id)
        return await fastify.rethinkdb.findExperimentById(id)
    })

    fastify.post('/experiments', async (req, rep)=>{
        
    })
    done()
}