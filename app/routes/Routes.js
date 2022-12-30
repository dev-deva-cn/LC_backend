const { createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    login } = require('../controllers/userControllers.js');

const router = require("express").Router();

router.post("/signup", createUser);
router.get("/",getUser);
router.get("/:id",getUserById);
router.patch("/",updateUser);
router.delete("/",deleteUser);
router.post("/login",login);

module.exports = router;