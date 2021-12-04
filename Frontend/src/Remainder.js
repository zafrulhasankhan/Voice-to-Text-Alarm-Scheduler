import React, { useEffect } from 'react';
import axios from './config/axios';
import { useAuth } from "./contexts/AuthContext";
import emailjs from 'emailjs-com';
import Axios from 'axios';
import Dictaphone from './Dictaphone';

function Remainder(props) {
    console.log("hey ekhane asche");
    const { currentUser, logout } = useAuth();
    var today2 = new Date()
    useEffect(() => {
        setInterval(() => {
            AlaramSet();
        }, 1000)

    
    }, [])

    const AlaramSet = () => {
        const monthNames = ['January', "February", "March", "April", "May", "June",
            "July", "August", "September", "October", 'November', "December"
        ];
        Date.prototype.addDays = function (days) {
            date.setDate(date.getDate() + days);
            return date;
        }
        var date = new Date();
        var date = date.addDays(1);

        var alarmDate = date.getDate() + " " + monthNames[date.getMonth()];
        var alarmDate2 = monthNames[date.getMonth()] + " " + date.getDate();
        // var alarmDate = '29 August';
        // var alarmDate2 = 'August 29';


        axios.get(`/remainder-list/${alarmDate}/${alarmDate2}`).then((result) => {

            const Data = result.data;

            for (let i = 0; i < Data.length; i++) {

                var templateParams = {
                    email: Data[i].email,
                    message: Data[i].message
                };
                var today = new Date()
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                if (time === "22:29:0") {
                    //sms part
                    // const greenwebsms = new URLSearchParams();
                    // greenwebsms.append('token', '3134fac5e85e1e2c785fb278f58492aa');
                    // greenwebsms.append('to', Data[i].phone_No);
                    // greenwebsms.append('message',
                    // `The alarm message set by your voice is : ${Data[i].message}  --- Voice To Text Remainder App`
                    // );
                    // Axios.post('http://api.greenweb.com.bd/api.php', greenwebsms).then(response => {

                    //     console.log('successfully sent');
                    // });

                    //email part
                    emailjs.send('service_1903', 'template_qltl43e', templateParams, 'user_E4pA7uCrDEmnsoSNfeuc6')
                        .then(function (response) {
                            console.log('SUCCESS!', response.status, response.text);
                        }, function (err) {
                            console.log('FAILED...', err);
                        });
                }
                else if (time === "22:30:0") {
                    //sms part
                    // const greenwebsms = new URLSearchParams();
                    // greenwebsms.append('token', '3134fac5e85e1e2c785fb278f58492aa');
                    // greenwebsms.append('to', Data[i].phone_No);
                    // greenwebsms.append('message',
                    // `The alarm message set by your voice is : ${Data[i].message}  --- Voice To Text Remainder App`
                    // );
                    // Axios.post('http://api.greenweb.com.bd/api.php', greenwebsms).then(response => {

                    //     console.log('successfully sent');
                    // });

                    //email part
                    emailjs.send('service_1903', 'template_qltl43e', templateParams, 'user_E4pA7uCrDEmnsoSNfeuc6')
                        .then(function (response) {
                            console.log('SUCCESS!', response.status, response.text);
                        }, function (err) {
                            console.log('FAILED...', err);
                        });
                }
            }
        })

    }
    return (
        <div>
            <Dictaphone />
        </div>
    );
}

export default (Remainder);