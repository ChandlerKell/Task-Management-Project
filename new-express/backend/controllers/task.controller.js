const { Task, Project, User } = require("../models");

module.exports = {
    getAll: async (req, res) => {
        try {
            const tasks = await Task.findAll({ include: [ { model: User, required: false }, { model: Project, required: false } ] });
            return res.send(tasks);
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;

            const task = await Task.findOne({ where: { id }});
            return res.send(task);
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    },
    getByUserId: async (req, res) => {
        try {
            const { userId } = req.params;

            const tasks = await Task.findAll({ where: { userId }});
            return res.send(tasks);
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    },
    getByProjectId: async (req, res) => {
        try {
            const { id: projectId } = req.params;

            const tasks = await Task.findAll({ where: { projectId }});
            return res.send(tasks);
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    },
    createTask: async (req, res) => {
        try {
            const { projectId, userId, title, summary, description, status, id } = req.body; 
            if(!id){
                const newTask = await Task.create({ projectId, userId, title, summary, description, status });
                return res.status(201).send(newTask);
            }
            const task = await Task.findOne({ where: { id } });
      
            if (!task) {
                return res.status(500).send({ error: `Task with ID ${id} not found` });
            }
        
            const updated = await task.update(req.body);
        
            return res.status(200).send(updated);
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    },
    updateTask: async (req, res) => {
        try {
          const { id } = req.params;
          const task = await Task.findOne({ where: { id } });
      
          if (!task) {
            return res.status(500).send({ error: `Task with ID ${id} not found` });
          }
      
          const updated = await task.update(req.body);
      
          return res.status(200).send(updated);
        } catch (error) {
            console.log(error)
        }
    },
    deleteTask: async (req, res) => {
        try {
          const { id } = req.params;
          const task = await Task.findOne({ where: { id } });
      
          if (!task) {
            return res.status(500).send({ error: `Task with ID ${id} not found` });
          }
      
          await Task.destroy({ where: { id } });
      
          return res.status(200).send(id);
        } catch (error) {
            console.log(error)
        }
    },
}

