import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Countdown } from "../compoments/Countdown";
import { ChallengesContext } from "./ChallengesContext";

 interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    Isactive: boolean;
    StartCountdown: () => void;
    resetCountdown: () => void;
 }
 
 interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    
    const { startNewChallenge } = useContext(ChallengesContext);


    const [time, setTime] = useState(0.1 * 60);
    const [Isactive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time/ 60);
    const seconds = time % 60;

    function StartCountdown() {
        setIsActive(true);
    }


    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.1 * 60);
        
    }


    useEffect(() => {
        if(Isactive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (Isactive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [Isactive, time])


    
    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            Isactive,
            StartCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}