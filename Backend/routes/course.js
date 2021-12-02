const express = require('express');
const router = express.Router();
var con = require('../config/dbconfig');

router.post("/add", function (req, res) {

    const course_code = (req.body.course_code).toUpperCase();
    const course_name = req.body.course_name;
    const course_pin = req.body.course_pin;
    const course_owner_email = req.body.course_owner_email;
    const sql_course_check = "SELECT id FROM `course_list` WHERE course_code = ?"
    var value = con.query(sql_course_check, [course_code], (error, result) => {
        if (!result.length) {

            con.query("insert into course_list (course_code,course_name,course_pin,email) values (?,?,?,?)", [course_code, course_name, course_pin, course_owner_email], (err, result) => {
                if (err) {
                    console.log(err)
                } else {

                    res.send(result);

                }
            })

        }
        else {
            res.send({ msg: `"${course_name} (${course_code})" already exists` })
        }
    })

})

router.post("/update", function (req, res) {

    const course_code = (req.body.course_code).toUpperCase();
    const prev_course_code = (req.body.prev_course_code).toUpperCase();
    const course_name = req.body.course_name;
    const sql_course_check = "SELECT * FROM `course_wise_student-list` WHERE course_code = ?"
    const sql_course_check_attend = "SELECT id FROM `attendance_sheet` WHERE course_code = ?"
    const sql_course_update = "update `course_list` set course_code = ? ,course_name=? WHERE course_code = ?";
    const sql_course_update_cwl = "update `course_wise_student-list` set course_code = ? WHERE course_code = ?";
    const sql_course_update_attend = "update `attendance_sheet` set course_code = ? WHERE course_code = ?";
    con.query(sql_course_update, [course_code, course_name, prev_course_code], (error, result) => {

        if (result) {
            con.query(sql_course_check, [prev_course_code], (error, result0) => {
                if (result0.length) {
                    con.query(sql_course_update_cwl, [course_code, prev_course_code], (error, result1) => {
                        if (error) {
                            res.send({ msg: 'Something wrong,Try Again.' })
                        }
                    })
                }
            })

            con.query(sql_course_check_attend, [prev_course_code], (error, result2) => {
                if (result2.length) {
                    con.query(sql_course_update_attend, [course_code, prev_course_code], (error, result3) => {
                        if (error) {
                            res.send({ msg: 'Something wrong,Try Again.' })
                        }
                    })
                }
            })

            res.send({ successMsg: "Successfully updated" })
        } else {
            res.send({ errorMsg: "Something wrong" })
        }
    })
})


router.get("/joinedCourses/:email", function (req, res) {

    const email = req.params.email;
    con.query("(SELECT course_code FROM `course_list` WHERE email = ?) UNION (SELECT course_code FROM `course_wise_student-list` WHERE email =?)", [email, email], (err, result) => {
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

router.post("/join", function (req, res) {

    const pin = req.body.pin;
    const student_email = req.body.student_email;
    const student_name = req.body.student_name;
    const student_id = req.body.student_Id;

    con.query("select * from course_list where course_pin = ?", [pin], (err, result) => {

        if (!result.length) {
            res.send({ msg: "Course not found" });
            return null;
        }
        var rows = result.length ? (JSON.parse(JSON.stringify(result[0]))) : ("");
        if (rows.email === student_email) {
            res.send({ msg: "You are the teacher of the course that you are trying to enter" })
        } else {


            if (result.length) {

                con.query("select student_id from `course_wise_student-list` where email = ? and course_code = ? ", [student_email, rows.course_code], (err, result2) => {

                    // var rows = JSON.parse(JSON.stringify(result[0]));
                    if (!result2.length) {


                        con.query("select * from `course_wise_student-list` where email = ? and course_code = ? ", [student_email, rows.course_code], (err, result1) => {

                            if (!result1.length) {


                                con.query("INSERT INTO `course_wise_student-list`(`student_id`, `student_name`, `email`, `course_code`) VALUES (?,?,?,?)",
                                    [student_id, student_name, student_email, rows.course_code], (err, result) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            // console.log("data success inserted");
                                            res.send("yes")
                                        }
                                    })

                            }
                            else {
                                res.send({ msg: "You are already logged in this course" })
                            }

                        })
                    }
                    else {
                        res.send({ msg: "Already Exists" })
                    }
                })

            }
            else {
                res.send({ msg: "Course not found" })
            }
        }
    })

})


router.get("/info/:code", function (req, res) {

    const code = req.params.code;
    con.query("select * from course_list where course_code = ?", [code], (err, result) => {
        if (err) {
            console.log(err)
        } else {

            res.send(result);

        }
    })

})

router.get("/count/:code", function (req, res) {
    const code = req.params.code;
    con.query("select * from `course_wise_student-list` where course_code = ?", [code], (err, result) => {

        res.send(result)
    })

})

//course detete

router.post("/delete/:code", function (req, res) {
    const course_code = req.params.code;

    const sql_delete_CL = "delete FROM `course_list` WHERE course_code = ?"
    const sql_delete_attend_sheet = "delete FROM `attendance_sheet` WHERE course_code = ?"
    const sql_course_check_attend = "SELECT id FROM `attendance_sheet` WHERE course_code = ?"
    const sql_course_check_CWL = "SELECT id FROM `course_wise_student-list` WHERE course_code = ?";
    const sql_course_Delete_CWL = "delete FROM `course_wise_student-list` WHERE course_code = ?";

    con.query(sql_delete_CL, [course_code], (err, result) => {

        // if(result){
        //     res.send("done")
        // }
    })
    con.query(sql_course_check_attend, [course_code], (error, result1) => {
        if (result1) {
            con.query(sql_delete_attend_sheet, [course_code], (error, result2) => {
                if (error) {
                    console.log(error);
                }
                // else{
                //     res.send("done")
                // }

            })
        }
    })

    con.query(sql_course_check_CWL, [course_code], (error, result3) => {
        if (result3) {
            con.query(sql_course_Delete_CWL, [course_code], (error, result1) => {
                if (error) {
                    console.log(error);
                }
                //   else{
                //       res.send("done")
                //   }
            })
        }
    })
    //res.send("done")


})


router.post("/remove/:code", function (req, res) {
    const course_code = req.params.code;
    const sql_course_check_CWL = "SELECT id FROM `course_wise_student-list` WHERE course_code = ?";
    const sql_course_Delete_CWL = "delete FROM `course_wise_student-list` WHERE course_code = ?";

    con.query(sql_course_check_CWL, [course_code], (error, result3) => {
        if (result3) {
            con.query(sql_course_Delete_CWL, [course_code], (error, result1) => {
                if (error) {
                    console.log(error);
                }
                //   else{
                //       res.send("done")
                //   }
            })
        }
    })
});

router.post("/removebyTeacher/:code/:email", function (req, res) {
    const course_code = req.params.code;
    const email = req.params.email;
    const sql_course_check_CWL = "SELECT id FROM `course_wise_student-list` WHERE course_code = ? and email =?";
    const sql_course_Delete_CWL = "delete FROM `course_wise_student-list` WHERE course_code = ? and email=?";

    con.query(sql_course_check_CWL, [course_code,email], (error, result3) => {
        if (result3) {
            con.query(sql_course_Delete_CWL, [course_code,email], (error, result1) => {
                if (error) {
                    console.log(error);
                }
            })
        }
    })
});
module.exports = router;
