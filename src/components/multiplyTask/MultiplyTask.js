import "./multiplyTask.scss";
import { useState, useRef } from 'react';
import { useInput } from '../../hooks/useInput';

import {fieldsDefault, arithOperations} from '../../settings';
import Inputs from "../input/Input";
import Button from "../button/Button";
import Checkboxes from "../checkboxes/Checkboxes";


const MultiplyTask = ({ firstNum, secondNum, resultNum, mistake }) => {

   const [hintInput, setHintInput] = useState('');

   //числа, которые являются вычислительными в процессе умножения
   const firstSum = useInput(fieldsDefault),
         secondSum = useInput(fieldsDefault),
         thirdSum = useInput(fieldsDefault);

   return (
      <div className="task task_multiply">
         <div className="task__top">
            <div className="task_multiply__top">
               <input 
                  className="input task_multiply__hint"
                  type="text" 
                  value={hintInput} 
                  onChange={(e) => setHintInput(e.target.value)}
               />
               <div className="task__sign">
                  {arithOperations["multiplication"].sign}
               </div>
            </div>
            
            <div className="task__numbers">
               <Inputs state={firstNum} count={7} disabled={4} />
               <Inputs state={secondNum} count={7} disabled={4}/>
            </div>
         </div>

         <hr className="task__line" />

         <div className="task__top">
            <div className="task__sign">+</div>
            
            <div className="task__numbers">
               <Inputs state={firstSum} count={7}/>
               <Inputs state={secondSum} count={7}/>
               <Inputs state={secondSum} count={7}/>
            </div>
         </div>



         <hr className="task__line" />

         <div className="task__answer task__numbers">
            <Inputs state={resultNum} count={7} mistake={mistake} />
         </div>
      </div>
   );
};

export default MultiplyTask;
