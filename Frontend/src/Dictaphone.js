import React, { useState, useEffect } from 'react'
import { useAuth } from "./contexts/AuthContext"
import axios from './config/axios';
import { useHistory } from "react-router-dom"
import { Button, Card, Alert } from 'react-bootstrap';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function App() {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])
  const history = useHistory()
  const { currentUser, logout } = useAuth()
  const [msg, setMsg] = useState("");
  useEffect(() => {
    handleListen();

  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        // console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        // console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      // console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var regex = new RegExp("\\d+ (" + months.join("|") + ")\\b|(" + months.join("|") + ") \\d+", "gi");
      var matches = transcript.match(regex);

      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([note])
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var regex = new RegExp("\\d+ (" + months.join("|") + ")\\b|(" + months.join("|") + ") \\d+", "gi");
    var matches = note.match(regex);
    if (!matches) {
      setMsg("Try Again");
    }


    axios.post('/remainder-info', {
      phone_No: "01612457547",
      email: currentUser.email,
      message: note,
      remainder_date: matches

    }).then((result) => {

      if (result.status = "200") {
        setMsg("Succesfully Alarm Set")
      }
    })
    setNote('')
  }

  return (
    <>

      <div className="container" style={{ fontFamily: 'cursive', position: 'relative', top: '100px' }}><br />
        {msg ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '17px'

          }}>
            <Alert className="alert col-md-3 text-center" variant="dark">
              {msg}
            </Alert>
          </div>
        ) : ""}
        <h2>Voice Alarm Set</h2><br />
        <p style={{ fontFamily: 'cursive' }}>{note}</p><br />
        <div className="box" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '17px'

        }}>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <Button className="btn btn-green" onClick={handleSaveNote} disabled={!note}>
            Set Note for Alarm
          </Button>&ensp;
          <Button className="btn btn-danger" onClick={() => setIsListening(prevState => !prevState)}>
            Start/Stop Microphone
          </Button>
        </div>
        {/* <div className="box">
          <h2>Notes</h2>
          {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div> */}
      </div>


    </>
  )
}

export default App