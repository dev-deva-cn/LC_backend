const { query } = require("express");
const pool = require("../../config/dbconfig.js");

module.exports = {
    create: (data, callback) => {
        pool.query(
            `insert into user_form_data (username,first_name,last_name,email,password) values(?,?,?,?,?);`,
            [
                data.username,
                data.first_name,
                data.last_name,
                data.email,
                data.password
            ],
            (err, result, fields) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, result)
            }
        );
    },
    getUser: callback => {
        pool.query("select id, username,first_name,last_name,email,password,status,created_at,updated_at from user_form_data where status = 'active'",
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            })
    },
    getUserById: (id, callback) => {
        pool.query(`select id, username,first_name,last_name,email,password,status,created_at,updated_at from user_form_data where id = ? and  status = 'active' `,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results[0])
            })
    },
    updateUser: (data, callback) => {
        pool.query(
            `update user_form_data set username=?, first_name = ?,last_name = ?,email = ?,password = ? where id =?;`,
            [
                data.username,
                data.first_name,
                data.last_name,
                data.email,
                data.password
            ],
            (err, result, fields) => {
                if (err) {
                    return callback(err)
                }

                return callback(null, result);
            }
        );
    },
    deleteUser: (data, callback) => {
        pool.query(
            `delete from user_form_data where id= ?`,
            [data.id],
            (error, results, fields) => {
                if (err) {
                    return callback(error)
                }
                return callback(null, results[0]);
            }
        )
    },
    getUserByUserUsername: (username, callback) => {
      let query =  pool.query(
            `select id, username,first_name,last_name,email,password,status,created_at,updated_at from user_form_data where status = 'active' and username=?`,
            [username],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                
// console.log(query);
                return callback(null, results[0]);
            }
        );
    }
};
