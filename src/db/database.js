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

    /**
     * Insert new measurement into databse
     * @param {Object} exp - experiment object
     * @param {List<Object>} meas list of measurement objects 
     */
    async createExperiment(exp, meas){
        // insert experinent ad get pk
        const exp_res = await this.db.table('Experiments').insert(exp).run()
        if(exp_res.errors != 0){
            return false
        }


        exp_id = exp_res.generated_keys[0]
        
        // set exp_id as a field of meas[]
        const N = meas.length

        for(let i=0; i<N; i++){
            meas[i].exp_id = exp_id
        }

        // and upload to db
        const meas_res = await this.db.table('Measurements').insert(meas).run()

        if(meas_res.errors==0){
            return true
        }else{
            return false
        }
    }


    /**
     * Deletes experiment and all connected measurements from database
     * @param {string} exp_id pk of experiment object
     */
    async deleteExperimentById(exp_id){
        let res = await this.db.table('Measurements').filter({exp_id:exp_id}).delete().run()
        if (res.errors!=0){
            return false;
        }
        ret = await this.db.table('Experiments').get(exp_id).delete().run()

        if(ret.errors!=null){
            return false
        }

        return true
    }
}

module.exports = Database
