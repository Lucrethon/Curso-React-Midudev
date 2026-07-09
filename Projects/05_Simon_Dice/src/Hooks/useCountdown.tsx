import { useState, useEffect } from 'react'

export const useCountdown = ({ itBegin, handleCountdownComplete, round }: 
    {itBegin: boolean
    handleCountdownComplete: () => void
    round: number
    }) => {

    const [countdown, setcountdown] = useState(3) // cuenta regresiva

      // ---------- Efecto: cuenta regresiva en pantalla ----------

    useEffect(() => {
        if (!itBegin) return;

        if (countdown === 0) {
        setTimeout(() => {
        handleCountdownComplete();
        }, 0); // <--- Tiempo cero
        return;
        // por que setTimeout de 0 segundos no genera errores de cascading renders?
        // JavaScript saca esa ejecución del flujo principal síncrono y la manda a la "cola de tareas" (Task Queue). React termina de procesar el renderizado actual del contador en 0, limpia el efecto, y en el milisegundo inmediatamente posterior, ejecuta los cambios de turno y ronda sin pisarse los talones.
        }

        const timer = setTimeout(() => {
        setcountdown(countdown - 1);
        },
    1000)
            //cleanup
        return () => {
            clearTimeout(timer)};
    
    }
        , [itBegin, countdown]); 

    const resetCountdown = () => setcountdown(3)

      // ------------------ Countdown Display ----------------

    const goMessage = () => {
        if (round > 0) return
        else {
            let message = `${countdown}`
            if (countdown === 0) message = "GO!"
            return message
        }
    }

    return { countdown, resetCountdown, goMessage }
}