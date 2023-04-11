import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import './Mallya.css';

const configuration = new Configuration({
  apiKey: "Enter you API key here",
});


function handleSpeakButtonClick(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}

async function runCompletion(transcript, setMedi) {
  
  try {
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: transcript,
      max_tokens: 300,
      temperature: 1,
    });
    const generatedText = completion.data.choices[0].text;
    console.log(generatedText);
    setMedi(generatedText)
    handleSpeakButtonClick(generatedText);
  } catch (error) {
    console.error(error);
  }
}

function Mallaya() {
  const [transcript, setTranscript] = useState("");
  const [medi , setMedi] = useState("")

  const recognition = new window.webkitSpeechRecognition();

  recognition.onresult = function (event) {
    const last = event.results.length - 1;
    const result = event.results[last][0].transcript;
    setTranscript(result);
    runCompletion(result, setMedi);
  };

  function startListening() {
    recognition.start();
  }

  return (
    <div>
      <div id="mallya" style={{backgroundColor: '#E1D9D1'}}>
      <button onClick={startListening} style={{backgroundColor: '#4CAF50', border: 'none', color: 'white', padding: '15px 32px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', margin: '4px 2px', cursor: 'pointer', borderRadius: '10px'}}>Start Listening</button>
      <p style={{color: '#333', fontSize: '18px', marginTop: '20px'}}> {transcript}</p>
      <p style={{margin : '25px 10px 10px 10px', padding: '10px'}}>{medi}</p>
      </div>

    </div>
  );
}

export default Mallaya;
