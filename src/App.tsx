//remember
//useState: memory/storage
//useEffect: automatic reactions to changes
//functions: actions when things happen
//return: what the user sees

//import to load the code
import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import alarmSound from './Assets/notification.wav'

//import assets that later be used at CSS
import bgWork from "./Assets/bg-work.png";
import bgBreak from "./Assets/bg-br.png";


//tell the typescript, hey window.electronAPI is valid thing. and the error will go away
declare global {
  interface Window {
    electronAPI?: {
      closeApp: () => void;
    };
  }
}

//define the message variable
const cheerMessages = [
    "You Can Do It Bulan",
    "Semangat Bulan",
    "Stay Focused!",
    "Setiap menit berharga"
  ];
  const breakMessages = [
    "Stay hydrated!",
    "Snacks time~",
    "Stretch your body!",
    "Istirahatkan matamu",
  ];

//define the cycle sequence for progress bar (an array of objects)
const cycleSequence = [
  { type: 'work', duration: 25*60},
  { type: 'break', duration: 5*60},
  { type: 'work', duration: 25*60},
  { type: 'break', duration: 5*60},
  { type: 'work', duration: 25*60},
  { type: 'break', duration: 5*60},
  { type: 'work', duration: 25*60},
  { type: 'break', duration: 30*60},
]
//define function timer variable
function App() {
  const [timeleft, setTimeLeft] = useState(25*60); //stores how many seconds are left
  const [isRunning, setIsRunning] = useState(false); //stores whether the timer is running
  const [isBreak, setIsBreak] = useState (false); //stores whether we are in break mode
  const [encouragement, setEncouragement] = useState(""); //stores the current message to display
  const [modeSelected, setModeSelected] = useState(false); //restore to normal interface, and only active when triggered w click on controls button
  const [cycleStep, setCycleStep] = useState(0); //membuat progress bar
  const [isFinished, setIsFinished] = useState(false); //setiap finish maka muncul pertanda sudah finish seperti message
  const [isCycleComplete, setIsCycleComplete] = useState(false); //setiap 1 cycle selesai, maka tombol restart muncul
  const [isCycleMode, setIsCycleMode] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [pendingMode, setPendingMode] = useState<boolean | null >(null)



//function Encouragement message updater
useEffect(() =>{
  let messageInterval : NodeJS.Timeout;

  if(isRunning){
    const messages = isBreak ? breakMessages : cheerMessages;
    setEncouragement(messages[0]); //set first message initially
    let index = 1

    messageInterval = setInterval(() => {
      setEncouragement(messages[index]);
      index = (index + 1) % messages.length;
    }, 4000); //every 4 seconds
  } else{
    setEncouragement("");
  }
  return() => clearInterval(messageInterval);
}, [isRunning, isBreak]);


//functions countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if(isRunning && timeleft > 0) {
      timer = setInterval(() =>{
        setTimeLeft(prev => prev-1);
      },1000);
    }else if (timeleft === 0) {
        //1. play alarm
          const alarm = new Audio (alarmSound);
          alarm.play().catch((e) => console.log('Audio blocked:',e));
        //2. stop timer and trigger blink
          setIsFinished(true);
          setIsRunning(false);
      }
    return() => clearInterval(timer);
  }, [isRunning, timeleft, cycleStep]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds/60).toString().padStart(2,'0');
    const s = (seconds % 60).toString().padStart(2,'0');
    return `${m}:${s}`;
  };
  const switchMode = (breakMode:boolean ) => {
    //cycle mode
    if (isCycleMode && (isRunning || isFinished)){
      setPendingMode(breakMode);
      setShowWarning(true);
      return;
    }

    //normal switch
    setIsCycleMode(false);
    setCycleStep(0);
    setIsBreak(breakMode);
    setIsRunning(false);
    setTimeLeft(breakMode ? 5*60 : 25*60);  
    setModeSelected(true);//activate when the user has clicked a modes
    setIsFinished(false);
  }


  //functions actions
  const handleClick = () => {
    const unlock = new Audio(alarmSound);
    unlock.volume = 0;
    unlock.play().catch(() => {});

    if (!isRunning && !isCycleMode && !modeSelected) {
      setIsCycleMode(true); //when this button clicked, do something
      setIsRunning(true); //when this button clicked, do something
    } else {
      setIsRunning(prev => !prev);
    }
  }
const handleCloseClick = () => {
  if(window.electronAPI?.closeApp){
    window.electronAPI.closeApp();
  } else{
    console.warn("Electron API not available");
  }
}

  //what appears on screen
  const containerClass = `home-container ${isBreak ? "bgBreak" : "bgWork"}`;
    return (
  <div className={containerClass} style={{position: 'relative'}}>
    {isCycleComplete ? (
      <div className="complete-message">
        <h2>Cycle Complete!</h2>
        <p>you did <br/> amazing Bulan</p>
        <button className="home-button" onClick={() => {
          setIsCycleComplete(false);
          setCycleStep(0);
          setTimeLeft(25*60);
          setIsBreak(false);
          setIsRunning(false);
          setModeSelected(false);
          setIsCycleMode(false);
        }}>Restart</button>
      </div>
    ) : (
      <div>
        {/* CLOSE BUTTON */}
        <button className='closeButton' onClick={handleCloseClick}>
          <i className='fa-solid fa-xmark'></i>
        </button>
        <button className='resetButton' onClick={()=>
          {
            setIsRunning(false);
            setTimeLeft(25*60);
            setIsBreak(false);
            setModeSelected(false);
            setIsCycleMode(false);
            setCycleStep(0);
            setIsFinished(false);
            setIsCycleComplete(false);
            setShowWarning(false);
            setEncouragement("");
          }
        }>
          <i className='fa-solid fa-arrows-rotate'></i>
        </button>

        {/* ISI CONTAINER */}
        <div className="home-content">

          {/* HEADING */}
          {isRunning ? (
            <p className="encouragement-text">{encouragement}</p>
          ) : (
            <h2>pomodoro timer</h2>
          )}

          {/* TIMER */}
          <h1 className={`home-timer ${isFinished ? "blinking" : ""}`}>
            {formatTime(timeleft)}
          </h1>

          {/* CONTINUE / START BUTTON */}
              {isFinished ? (
  isCycleMode ? (
    <button className="continue-Button" onClick={() => {
      setIsFinished(false);
      const nextStep = cycleStep + 1;
      if (nextStep < cycleSequence.length) {
        setCycleStep(nextStep);
        setTimeLeft(cycleSequence[nextStep].duration);
        setIsBreak(cycleSequence[nextStep].type === 'break');
        setIsRunning(true);
      } else {
        setCycleStep(0);
        setTimeLeft(5);
        setIsBreak(false);
        setIsCycleComplete(true);
      }
    }}>Continue</button>
  ) : (
    <button className="home-button" onClick={() => {
      setIsFinished(false);
      setTimeLeft(isBreak ? 5*60 : 25*60);
      setIsRunning(true);
    }}>Start</button>
  )
) : (
  <button className="home-button" onClick={handleClick}>
    {isRunning ? "pause" : "start"}
  </button>
)}

          {/* BREAK AND WORK BUTTON */}
          <div className="home-controls">
            <button className={`work-button ${modeSelected && !isBreak ? "active" : ""}`}
              onClick={() => switchMode(false)}>
              work
            </button>
            <button className={`break-button ${modeSelected && isBreak ? "active" : ""}`}
              onClick={() => switchMode(true)}>
              break
            </button>
          </div>
          {showWarning &&(
            <div className="warning-popup">
              <p>You will lose your cycle counting. Still proceed?</p>
              <div className='yes-no'>
              <button className='yes' onClick={() => {
                setShowWarning(false);
                setIsCycleMode(false);
                setCycleStep(0);
                setIsBreak(pendingMode!)
                setIsRunning(false);
                setTimeLeft(pendingMode ? 5*60 : 25*60);
                setModeSelected(true);
                setIsFinished(false);
                setPendingMode(null);
              }}>Yes, proceed</button>
              <button className='no' onClick={() => {
                setShowWarning(false);
                setPendingMode(null);
              }}>No</button></div>
            </div>
          )}

          {/* CYCLE BAR */}
          {isCycleMode && (
            <div className="cycle-bar">
              {cycleSequence.map((segment, index) => (
                <div
                  key={index}
                  className={`cycle-segment ${segment.type} ${index < cycleStep ? "completed" : ""} ${index === cycleStep ? "active" : ""}`}
                  style={{ flex: segment.duration }}
                  >
                    {index === cycleStep && (
                      <div className="cycle-marker"/> )}
                      </div>
              ))}
            </div>
          )}

        </div>
      </div>
    )}
  </div>

);
}
export default App;
