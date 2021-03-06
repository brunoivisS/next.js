
import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';



export function Countdown() {
    const { minutes,
         seconds,
          hasFinished,
           Isactive,
            StartCountdown,
             resetCountdown
             } = useContext(CountdownContext) 
    const [minuteLeft, minuteRight] = String(minutes).padStart(2,  '0').split('');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2,  '0').split('');

   
    return (
        <div>
        <div className={styles.CountdownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
                <span>{secondsLeft}</span>
                <span>{secondsRight}</span>
            </div>
            </div>


            { hasFinished ? (
               <button 
               disabled 
               className={styles.CountdownButton}
               >
                   Ciclo encerrado
               </button>
             ) : (
                <>
                        { Isactive ?(
                    <button 
                    type="button" 
                    className={styles.CountdownButtonActive}
                    onClick={resetCountdown}
                    >
                        Abandonar ciclo
                    </button>
                ) : (
                    <button 
                type="button" 
                className={styles.CountdownButton}
                onClick={StartCountdown}
                >
                    Iniciar um ciclo
                </button>
                ) }

            </> 
             )}
            

            
        </div>
    );
}