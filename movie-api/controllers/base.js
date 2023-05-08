class BaseController {
    static repository = null;

    static getAll(req, res){
        this.repository.getAll()
            .then((items) => res.json(items))
            .catch((err) => res.status(500).send(err))
    }

    static getOne(req, res){
        const { id } = req.params;
        this.repository.getOne(id)
            .then((item) => res.json(item))
            .catch((err) => res.status(500).send(err))
    }

    static create(req, res){
        const data = req.body;
        this.repository.create(data)
            .then(item => res.status(201).json(item))
            .catch(err => res.status(500).send(err));
    }

    static update(req, res){
        const { id } = req.params;
        const data = req.body;
        this.repository.update(id, data)
            .then(item => res.json(item))
            .catch(err => res.status(500).send(err));
    }

    static delete(req, res){
        const { id } = req.params;
        this.repository.delete(id)
            .then(() => res.status(204).send())
            .catch(err => res.status(500).send(err));
    }
}

module.exports = {BaseController}