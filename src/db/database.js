'use strict'


class Database{
    constructor(options){
        this.db = require('rethinkdbdash')(options)
    }

    async tables(){
        return this.db.tableList().run()
    }

    async findExperimentById(id){
        return this.db.table('Experiments').get(id).run()
    }

    async findAllExperiments(){
        return this.db.table('Experiments').run()
    }

    async findMeasurementsByExperimentId(expid){
        return this.db.table('Measurements').filter({exp_id:expid}).run()
    }
}

module.exports = Database
