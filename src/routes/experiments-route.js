module.exports  =  function (fastify, opts, done) {
    
    fastify.get('/tables/:id',async (request, reply)=>{
    
        const {id} = request.params
        let tbls =  await fastify.rethinkdb.tables()
        //console.log(Object.keys(tbls))
        console.log(tbls)
        
        return tbls
    })
    done()
}