const express = require('express');
const router = express.Router();
var con = require('../config/dbconfig');


//get all student data to make attendance sheet
router.post("/sheet", function (req, res) {
    const course_code = req.body.course_code;
    const sql = "select * from `course_wise_student-list` where course_code = ? order by student_id asc";

    con.query(sql, [course_code], (error, result) => {
        if (error) {
            console.log(error)
        }
        else {
            res.send(result)
        

        }
    })

})

//check class num of each course
router.post("/check_classNum", function (req, res) {

    const course_code = req.body.course_code;
    const sql_classNum_check = "SELECT id FROM `attendance_sheet` WHERE course_code = ?"
    try {
        var value = con.query(sql_classNum_check, [course_code], (error, result) => {
            if (error) {
                console.log(error)
            }
            else {
                res.send(result)
               

            }
        })
    } catch (error) {
        console.log(error);
    }



})

// submit attendance report by teacher
router.post("/submit", function (req, res) {

    const course_code = req.body.course_code;
    const class_num = req.body.class_num;
    const attendance_data = req.body.attendance_data;
    const date = req.body.date;

    const sql_classNum_check = "SELECT id FROM `attendance_sheet` WHERE course_code = ? and class_num = ?"
    var value = con.query(sql_classNum_check, [course_code, class_num], (error, result) => {
        if (!result.length) {
            //Insert attendance data into db
            const sql = "insert into attendance_sheet (`course_code`,`class_num`,`attendance_data`,`date`) VALUES (?,?,?,?)"
            con.query(sql, [course_code, class_num, attendance_data, date], (error, result) => {
                if (error) {
                    console.log(error)
                }
                else {
                    res.send({msg:"SuccessFully attendance submitted"})
                    

                }
            })
        }
        else {
            res.send({msg:"Already exists this class number attendance"})
        }
    })



})

//get all student attendance report by course wise 
router.get('/attendance-report/:course_code', (req, res) => {
    const course_code = req.params.course_code;
    con.query("select * from attendance_sheet where course_code = ?", [course_code], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            
            res.send(result);
            
        }
    })
})

//get all student attendance report by date wise 
router.get('/datewise-attendance-report/:course_code/:date', (req, res) => {
    const course_code = req.params.course_code;
    const date = req.params.date;
    con.query("select * from attendance_sheet where course_code = ? and date= ?", [course_code, date], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length) {
                res.send(result);
            }else{
                res.send({msg:"No Attendance reported on this date"})
            }
            
        }
    })
})
module.exports = router;