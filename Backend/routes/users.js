const express = require('express');
const router = express.Router();
var con = require('../config/mysql');


router.post("/register", function (req, res) {

    const name = req.body.name;
    const email = req.body.email;
    const profile_photo = req.body.profile_photo;
    const sql_exist = "select * from user where email = ?";
    const sql = "INSERT INTO `user`(`name`,`email`,`profile_photo`) VALUES (?,?,?)";

    con.query(sql_exist, [email], (error, result) => {
        if (result.length) {
            res.send("yes insert")
        }
        else {
            con.query(sql, [name, email, profile_photo], (error) => {
                if (error) {
                    console.log(error)
                }
                else {
                    //console.log("Data inserted successfully")
                    res.send("yes insert");

                }
            })
        }
    })
})

router.post("/remainder-info", function (req, res) {
    const email = req.body.email;
    const phone_No = req.body.phone_No;
    const message = req.body.message;
    const remainder_date = req.body.remainder_date;
    console.log(message, remainder_date);
    const sql = "INSERT INTO `remainder-list`(`email`, `phone_No`, `remainder_date`, `message`) VALUES (?,?,?,?) ";
    con.query(sql, [email, phone_No, remainder_date, message], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send(result);
        }
    })
})

router.post("/add-phone", function (req, res) {

    const phoneNo = req.body.phoneNo;
    const email = req.body.email;
    console.log(phoneNo,email);
    const sql = "UPDATE `remainder-list` SET `phone_No`=? where email =? ";
    con.query(sql, [phoneNo,email], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send(result);
        }
    })
})

router.get("/remainder-list/:date1/:date2", function (req, res) {

    const date1 = req.params.date1;
    const date2 = req.params.date2;
    con.query("(SELECT * FROM `remainder-list` where `remainder_date` = ?) UNION (SELECT * FROM `remainder-list` where `remainder_date` = ?)", [date1, date2], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length) {
                res.send(result);
            } else {
                res.send({ msg: "You have not yet associated to any courses" })
            }

        }
    })

})


module.exports = router;
