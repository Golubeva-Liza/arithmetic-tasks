import "./multiplyTask.scss";
import { useState, useEffect } from 'react';
import SumFields from "./SumFields";
import Inputs from "../input/Input";

import {arithOperations} from '../../settings';
import clearNumFields from '../../lib/clearNumFields';


const MultiplyTask = ({ 
      firstNum, 
      secondNum, 
      resultNum, 
      mistake, 
      firstSum, 
      secondSum, 
      thirdSum,
      hintDigit
   }) => {

   //количество строк для вычисления промежуточных значений, которые суммируются для ответа. При значении 1 ничего не отображается.
   const [strokeSumNum, setStrokeSumNum] = useState(1);
   //чекбоксы для отметок
   const [checked, setChecked] = useState([]);


   useEffect(() => {
      //Math.min(+firstNum.value.join(''), +secondNum.value.join(''));
      const digitCount = String(+secondNum.value.join('')).length;
      setChecked([]);

      if (digitCount !== strokeSumNum){
         if (digitCount == 1){
            clearNumFields(firstSum, secondSum, thirdSum);
         } else if (digitCount == 2){
            clearNumFields(thirdSum);
         }
         setStrokeSumNum(digitCount);
      }
     
   }, [firstNum.value, secondNum.value])


   return (
      <div className="task task_multiply">
         <div className="task__top">
            <div className="task_multiply__top">
               <div className="task__sign">
                  {arithOperations["multiplication"].sign}
               </div>
            </div>
            
            <div>
               <div className="task_multiply__hint">{hintDigit}</div>

               <div className="task__numbers task__numbers_multiply">
                  <Inputs state={firstNum} count={7} disabled={4} />
                  <Inputs state={secondNum} count={7} disabled={4}/>
               </div>
            </div>
            
         </div>

         <SumFields 
            firstSum={firstSum} 
            secondSum={secondSum}
            thirdSum={thirdSum}
            strokeCount={strokeSumNum}
            checked={checked}
            setChecked={setChecked}
         />

         <hr className="task__line" />

         <div className="task__answer task__numbers">
            <Inputs state={resultNum} count={7} mistake={mistake} />
         </div>
      </div>
   );
};

export default MultiplyTask;
