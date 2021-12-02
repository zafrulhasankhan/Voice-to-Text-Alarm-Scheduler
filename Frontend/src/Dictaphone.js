import React, { useState, useEffect } from 'react'
import { useAuth } from "./contexts/AuthContext"
import axios from './config/axios';
import { useHistory } from "react-router-dom"


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

  useEffect(() => {
    handleListen();
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
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
      console.log(matches);
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
    console.log(matches[0]);


    axios.post('/remainder-info', {
      phone_No: "01612457547",
      email: currentUser.email,
      message: note,
      remainder_date: matches

    }).then((result) => {
      history.push("/login")
    })
    setNote('')
  }

  return (
    <>
      <h1>Voice Notes</h1>
      <div className="container">
        <div className="box">
          <h2>Current Note</h2>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          <button onClick={() => setIsListening(prevState => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div className="box">
          <h2>Notes</h2>
          {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>


    </>
  )
}

export default App