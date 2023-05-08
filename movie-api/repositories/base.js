const {Director} = require("../models");

class BaseRepository {
    static model = Director;
    static includes = {both: [], getAll: [], getOne: []};

    static async getAll(options){
        return await this.model.findAll({include: [...(this.includes.getAll||[]), ...(this.includes.both||[])], ...options})
    }

    static async getOne(id){
        return await this.model.findByPk(id, {include: [...(this.includes.getOne||[]), ...(this.includes.both||[])]})
    }

    static async create(data){
        const item = await this.model.create(data)
        return await this.getOne(item.id)
    }

    static async update(id, data){
        const item = await this.getOne(id)
        if(item) await item.update(data)
        return await this.getOne(id)
    }

    static async delete(id){
        const item = await this.getOne(id)
        if(item) return await item.destroy()
    }

    static async count(){
        return await this.model.count()
    }
}

module.exports = {BaseRepository}