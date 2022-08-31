import "./multiplyTask.scss";
import { useState, useMemo, useEffect } from 'react';
import { useInput } from '../../hooks/useInput';
import SumFields from "./SumFields";

import {fieldsDefault, arithOperations} from '../../settings';
import Inputs from "../input/Input";
import Button from "../button/Button";
import Checkboxes from "../checkboxes/Checkboxes";


const MultiplyTask = ({ 
      firstNum, 
      secondNum, 
      resultNum, 
      mistake, 
      firstSum, 
      secondSum, 
      thirdSum,
      hintDigit,
      clearSumFields, clearThirdFields
   }) => {

   
   const [strokeSumNum, setStrokeSumNum] = useState(1);

   useEffect(() => {
      //Math.min(+firstNum.value.join(''), +secondNum.value.join(''));
      const digitCount = String(+secondNum.value.join('')).length;
      
      if (digitCount == 1){
         clearSumFields();
      }

      if (digitCount == 2){
         clearThirdFields();
      }

      if (digitCount !== strokeSumNum){
         setStrokeSumNum(digitCount);
      }
   }, [firstNum.value, secondNum.value])

   return (
      <div className="task task_multiply">
         <div className="task__top">
            <div className="task_multiply__top">
               <div className="task_multiply__hint">{hintDigit}</div>
               <div className="task__sign">
                  {arithOperations["multiplication"].sign}
               </div>
            </div>
            
            <div className="task__numbers">
               <Inputs state={firstNum} count={7} disabled={4} />
               <Inputs state={secondNum} count={7} disabled={4}/>
            </div>
         </div>

         <SumFields 
            firstSum={firstSum} 
            secondSum={secondSum}
            thirdSum={thirdSum}
            strokeCount={strokeSumNum}
         />


         <hr className="task__line" />

         <div className="task__answer task__numbers">
            <Inputs state={resultNum} count={7} mistake={mistake} />
         </div>
      </div>
   );
};

export default MultiplyTask;
