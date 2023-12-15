'use strict'


class Database{
    constructor(options){
        this.db = require('rethinkdbdash')(options)
    }

    /**
     * 
     * @returns array of tables in Lidar database
     */
    async tables(){
        return this.db.tableList().run()
    }

    /**
     * 
     * @param {string} exp_id - primary key of experiment.
     * @returns Experiment document for the specific pk
     */
    async findExperimentById(exp_id){
        return this.db.table('Experiments').get(exp_id).run()
    }

    /**
     * 
     * @returns list of all experiments
     */
    async findAllExperiments(){
        return this.db.table('Experiments').run()
    }

    /**
     * 
     * @param {string} expid - id of experiment
     * @returns list of measurements for the specific experiment id.
     */
    async findMeasurementsByExperimentId(expid){
        return this.db.table('Measurements').filter({exp_id:expid}).run()
    }

    /**
     * 
     * @param {string} meas_id id of the specific measurement
     * @returns certain Measurement for the given pk
     */
    async findMeasurementById(meas_id){
        return this.db.table('Measurements').get(meas_id).run()
    }
}

module.exports = Database
