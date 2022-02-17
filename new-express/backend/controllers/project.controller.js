const { Project } = require("../models");

module.exports = {
    getAll: async (req, res) => {
        try {
            const projects = await Project.findAll();
            return res.send(projects);
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;

            const project = await Project.findOne({ where: { id }});
            return res.send(project);
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    },
    getByUserId: async (req, res) => {
        try {
            const { userId } = req.params;

            const projects = await Project.findAll({ where: { userId }});
            return res.send(projects);
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    },
    createProject: async (req, res) => {
        try {
            const { userId, name, description, status } = req.body; 
            const newProject = await Project.create({ userId, name, description, status });
            return res.status(201).send(newProject);
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    },
    updateProject: async (req, res) => {
        try {
          const { id } = req.params;
          const project = await Project.findOne({ where: { id } });
      
          if (!project) {
            return res.status(500).send({ error: `Project with ID ${id} not found` });
          }
      
          const updated = await project.update(req.body);
      
          return res.status(200).send(updated);
        } catch (error) {
            console.log(error)
        }
    },
    deleteProject: async (req, res) => {
        try {
          const { id } = req.params;
          const project = await Project.findOne({ where: { id } });
      
          if (!project) {
            return res.status(500).send({ error: `Project with ID ${id} not found` });
          }
      
          await Project.destroy({ where: { id } });
      
          return res.status(200).send(id);
        } catch (error) {
            console.log(error)
        }
    },
}

