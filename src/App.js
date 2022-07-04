import { useEffect, useState } from "react"
import "./App.scss"



function App() {
     const [brkLength, setBrkLength] = useState(5)
     const [seshLength, setSeshLength] = useState(25)
     const [timerState, setTimerState] = useState("stopped")
     const [timerType, setTimerType] = useState("Session")
     const [timer, setTimer] = useState(1500)
     const [alarmColor, setAlarmColor] = useState({ color: "black" })
     const [pausePlay, setpausePlay] = useState(true)
     const [heatbeatClass, setHeatbeatClass] = useState("")

     const handleBrkLength = (sign) => {
        if (timerState === "running") return {}
                if (sign==="+"){
                        brkLength<60  && setBrkLength(brkLength + 1)
                }
                else if (sign==="-" ){
                        brkLength > 1 && setBrkLength(brkLength - 1)
                }
     }
     
     const handleSeshLength = (sign) => {
        if (timerState === "running") return {}
                if (sign==="+"){
                        seshLength<60  && setSeshLength(seshLength + 1) 
                        seshLength<60  && setTimer(timer + 60)
                }
                else if (sign==="-" ){
                        seshLength > 1 && setSeshLength(seshLength - 1) 
                        seshLength > 1 && setTimer(timer - 60)
                }
     }

     
        const clockify=()=> {
                let minutes = Math.floor(timer / 60);
                let seconds = timer - minutes * 60;
                seconds = seconds < 10 ? '0' + seconds : seconds;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                return minutes + ':' + seconds;
        }

        const timeout = setTimeout(() => {
                if(timer && timerState==="running"){
                  setTimer(timer - 1)
                }
                warning(timer)
                buzzer(timer)
                
        }, 1000);

        
        const handleTimerControl = () => {
                setpausePlay(btn=>!btn)
                clearTimeout(timeout)

                pausePlay ?
                        setHeatbeatClass("clock-heartbeat")
                :
                        setHeatbeatClass("")
                
                timerState === 'stopped' ?
                        setTimerState( 'running' )
                :
                        setTimerState('stopped' );
        }

        const reset=()=> {
                const audioBeep = document.getElementById("beep");

                setpausePlay(true)
                setHeatbeatClass("")
                setBrkLength(5)
                setSeshLength(25)
                setTimerState('stopped')
                setTimerType('Session')
                setTimer(1500)
                setAlarmColor({ color: 'black' })
               
                audioBeep.pause();
                audioBeep.currentTime = 0;
        }

        const resetTimer = () => {
                const audioBeep = document.getElementById("beep");


                if(!timer && timerType === "Session"){
                        setTimer(brkLength * 60)
                        setTimerType("Break")
                }
                if(!timer && timerType === "Break"){
                        setTimer(seshLength * 60)
                        setTimerType("Session")
                        audioBeep.pause()
                        audioBeep.currentTime = 0;
                }
        }

        const clock = () => {
                if(timerState==="running"){
                        console.log(timeout)
                        resetTimer()
                }else {
                        clearTimeout(timeout)
                }
              }
        
        
        

        

        const warning=(_timer)=> {
                if (_timer < 61) {
                        setAlarmColor( { color: '#a50d0d' })
                } else {
                        setAlarmColor( { color: 'black' })
                }
              }

        const  buzzer=(_timer)=> {
                const audioBeep = document.getElementById("beep");
                        if (_timer === 0) {
                                audioBeep.play();
                        }
        }
        
        

        
       useEffect(() => {
                clock()
        }, [timerState, timer, timeout])
       

        
        
     return (
          <div className='App'>
               <div className='clock'>
                    <h1 className='main-title'>Plus Clock</h1>
                    <div className='lengths'>
                         <div id='"break-label"'>
                              Break Length
                              <div id="break-control">
                                   <svg
                                        id="break-decrement"
                                        onClick={()=>handleBrkLength("-")}
                                        clipRule='evenodd'
                                        fillRule='evenodd'
                                        strokeLinejoin='round'
                                        strokeMiterlimit='2'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                   >
                                        <path
                                             d='m11.998 2c5.517 0 9.997 4.48 9.997 9.998 0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm4.843 8.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291z'
                                             fillRule='nonzero'
                                        />
                                   </svg>
                                   <span id="break-length">{brkLength}</span>
                                   <svg
                                        id="break-increment"
                                        onClick={()=>handleBrkLength("+")}
                                        clipRule='evenodd'
                                        fillRule='evenodd'
                                        strokeLinejoin='round'
                                        strokeMiterlimit='2'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                   >
                                        <path
                                             d='m11.998 21.995c5.517 0 9.997-4.48 9.997-9.997 0-5.518-4.48-9.998-9.997-9.998-5.518 0-9.998 4.48-9.998 9.998 0 5.517 4.48 9.997 9.998 9.997zm4.843-8.211c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291z'
                                             fillRule='nonzero'
                                        />
                                   </svg>
                              </div>
                         </div>
                         <div id="session-label">
                              Session Length
                              <div id="break-control">
                                   <svg
                                        id="session-decrement"
                                        onClick={()=>handleSeshLength("-")}
                                        clipRule='evenodd'
                                        fillRule='evenodd'
                                        strokeLinejoin='round'
                                        strokeMiterlimit='2'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                   >
                                        <path
                                             d='m11.998 2c5.517 0 9.997 4.48 9.997 9.998 0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm4.843 8.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291z'
                                             fillRule='nonzero'
                                        />
                                   </svg>
                                   <span id="session-length">{seshLength}</span>
                                   <svg
                                        id="session-increment"
                                        onClick={()=>handleSeshLength("+")}
                                        clipRule='evenodd'
                                        fillRule='evenodd'
                                        strokeLinejoin='round'
                                        strokeMiterlimit='2'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                   >
                                        <path
                                             d='m11.998 21.995c5.517 0 9.997-4.48 9.997-9.997 0-5.518-4.48-9.998-9.997-9.998-5.518 0-9.998 4.48-9.998 9.998 0 5.517 4.48 9.997 9.998 9.997zm4.843-8.211c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291z'
                                             fillRule='nonzero'
                                        />
                                   </svg>
                              </div>
                         </div>
                    </div>
                    <div className='timerbox'>
                         <div>
                              <h2 id='timer-label'>{timerType}</h2>
                              <p id="time-left"  className= {`${heatbeatClass}`} style={alarmColor}>
                                   {clockify()}
                              </p>
                              <audio
                                        id="beep"
                                        preload="auto"
                                        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                                />
                         </div>
                    </div>
                    <div className='timerboxControls'>
                         <div className=''>
                              {pausePlay ? (
                                   <svg
                                        id="start_stop"
                                        onClick={()=>handleTimerControl()}
                                        width='24'
                                        height='24'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                   >
                                        <path d='M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z' />
                                   </svg>
                              ) : (
                                   <svg
                                        id="start_stop"
                                        onClick={()=>handleTimerControl()}
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                   >
                                        <path d='M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z' />
                                   </svg>
                              )}
                              <svg
                                   id="reset"
                                   onClick={()=>reset()}
                                   xmlns='http://www.w3.org/2000/svg'
                                   width='24'
                                   height='24'
                                   viewBox='0 0 24 24'
                              >
                                   <path d='M5 18c4.667 4.667 12 1.833 12-4.042h-3l5-6 5 6h-3c-1.125 7.98-11.594 11.104-16 4.042zm14-11.984c-4.667-4.667-12-1.834-12 4.041h3l-5 6-5-6h3c1.125-7.979 11.594-11.104 16-4.041z' />
                              </svg>
                         </div>
                    </div>
               </div>
               <div className='credits'>
                    Code and Design By <br />
                    <a
                         href='https://ogooluwanick-portfolio.netlify.app/'
                         target='_blank'
                         rel='noreferrer'
                    >
                         Ogooluwanick
                    </a>
               </div>
          </div>
     )
}

export default App
