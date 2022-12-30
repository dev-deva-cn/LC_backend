const { create, getUser,
    getUserById, updateUser,
    deleteUser, getUserByUserUsername } = require('../models/userModel.js');

const bcrypt = require("bcrypt")
const { sign } = require("jsonwebtoken");
const { query } = require('../../config/dbconfig.js');
const pool = require('../../config/dbconfig.js');
module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: " DataBase connection error"
                });
            }
            return res.status(200).json({
                status: 0,
                message:"Signup Succesfully",
                data: results
            })
        })
    },
    getUser: (req, res) => {
        getUser((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message:"Getting all Users Data",
                data: results
            })
        })
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message:`Getting user id: ${id}  Data`,
                data: results
            })
        })
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update user data"
                })
            }
            return res.json({
                status: 1,
                // data: results
                message: "successfully updated "
            })
        })
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: " Record Not found "
                });
            }
            return res.json({
                success: 1,
                message: "User deleted successfully"
            })
        })
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserUsername(body.username, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid username and password"
                });
            }
            const result = bcrypt.compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "1h"
                });
                    // console.log();
                    return res.json({
                    success: 1,
                    message: `Login into ${body.username} successfully`,
                    // token: jsontoken
                    data:results
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid email and password",
                });
            }
        })
    }
}