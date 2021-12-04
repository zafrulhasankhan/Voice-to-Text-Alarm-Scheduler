import { Button, Card, Container } from 'react-bootstrap';
import React, { useState, useEffect, useContext, lazy } from 'react';
import { useHistory } from 'react-router-dom';
import axios from './config/axios';
import { useAuth } from "./contexts/AuthContext"

function AddPhone() {

    const { currentUser } = useAuth();
    useEffect(() => {

        if (localStorage.getItem('user-info')) {

            history.push("/add");
        }
    }, [])

    const history = useHistory();
    const [phoneNo, setphoneNo] = useState("");


    async function SignUp() {
        let email = currentUser.email;
        let item = { phoneNo };
        console.log(phoneNo);
        axios.post('/add-phone', {
            email: email,
            phoneNo: phoneNo
        }).then(() => {
            history.push("/add");
        })

    }

    return (
        <>

            <Card className="offset-md-4 col-md-4 card text-center"
                style={{ position: 'relative', top: '120px', backgroundColor: 'gray' }}
            >
                <Card.Body>

                    <div className="col-md-8 offset-sm-2">
                        <h4 style={{ fontFamily: 'cursive' }}><u>AddPhone</u></h4>
                        <input className="col-md-8" type="text" value={phoneNo} onChange={(e) => setphoneNo(e.target.value)} className="form-control" name="name" placeholder="Enter phone No." /> <br />
                        <button onClick={SignUp} className="btn btn-primary">Submit</button>
                    </div>
                </Card.Body>
            </Card>

        </>
    );
}

export default AddPhone;