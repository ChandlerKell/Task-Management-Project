const router = require("express").Router();
const taskController = require("./controllers/task.controller.js");
const projectController = require("./controllers/project.controller.js");
const userController = require("./controllers/user.controller.js");

router.get("/tasks", taskController.getAll);
router.get("/tasks/:id", taskController.getById);
router.get("/tasks/user/:id", taskController.getByUserId);
router.get("/tasks/project/:id", taskController.getByProjectId);
router.post("/tasks", taskController.createTask);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

router.get("/projects", projectController.getAll);
router.get("/projects/:id", projectController.getById);
router.get("/projects/user/:id", projectController.getByUserId);
router.post("/projects", projectController.createProject);
router.put("/projects/:id", projectController.updateProject);
router.delete("/projects/:id", projectController.deleteProject);

router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;

