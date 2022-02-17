const { User } = require("../models");

module.exports = {
    getAll: async (req, res) => {
        try {
            const users = await User.findAll();
            return res.send(users);
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await User.findOne({ where: { id }});
            return res.send(user);
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    },
    createUser: async (req, res) => {
        try {
            const { name, email, password } = req.body; 
            const newUser = await User.create({ name, email, password });
            return res.status(201).send(newUser);
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    },
    updateUser: async (req, res) => {
        try {
          const { id } = req.params;
          const user = await User.findOne({ where: { id } });
      
          if (!user) {
            return res.status(500).send({ error: `User with ID ${id} not found` });
          }
      
          const updated = await user.update(req.body);
      
          return res.status(200).send(updated);
        } catch (error) {
            console.log(error)
        }
    },
    deleteUser: async (req, res) => {
        try {
          const { id } = req.params;
          const user = await User.findOne({ where: { id } });
      
          if (!user) {
            return res.status(500).send({ error: `User with ID ${id} not found` });
          }
      
          await User.destroy({ where: { id } });
      
          return res.status(200).send(id);
        } catch (error) {
            console.log(error)
        }
    },
}

