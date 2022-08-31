import { useState, useMemo } from "react";
import {Right, Wrong} from '../resources';

const useMessage = () => {
   
    //0 - нет сообщения, 1 - правильно, 2 - неправильно, 3 - некорректно введены числа
    const [messageCode, setMessageCode] = useState(0);
    
    const message = useMemo(() => {
        switch(messageCode) {
        case 0:
            return;
        case 1:
            return (
                <div className="main__message main__message_right">
                    <Right/>
                    правильно
                </div>
            )
        case 2: return (
            <div className="main__message main__message_wrong">
                <Wrong/>
                неправильно
            </div>
        )
        default: return;
        }
    }, [messageCode])

    return {messageCode, setMessageCode, message};
}

export default useMessage;