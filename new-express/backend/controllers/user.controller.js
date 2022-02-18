const { User } = require("../models");
const bcrypt = require ('bcrypt');

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
            const { name, email, enteredPassword } = req.body; 
            bcrypt.genSalt(10, async function(err, salt) {  
                bcrypt.hash(enteredPassword, salt, async function(err, hash) {
                    const password = hash;
                    const newUser = await User.create({ name, email, password });
                    return res.status(201).send(newUser);
                });
            });
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
          bcrypt.genSalt(10, async function(err, salt) {  
            bcrypt.hash(enteredPassword, salt, async function(err, hash) {
                const password = hash;
                const updated = await user.update(name, email, password);
                return res.status(201).send(updated);
            });
          });
      
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
    loginAttempt: async (req, res) => {
        try {
          const { email, password } = req.body;
          const user = await User.findOne({ where: { email } });
      
          if (!user) {
            return res.status(500).send({ error: `User with Email ${email} not found` });
          }
      
          bcrypt.compare(password, user.password, function(err, result) {
            if (result) {
                console.log("password correct")
                return res.status(200).send(true);
            }
            else {
                console.log("password incorrect")
                return res.status(200).send(false);
            }
          });
        } catch (error) {
            console.log(error)
        }
    },
}

