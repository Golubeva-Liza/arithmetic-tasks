import { useState } from "react";
import {createNumArr} from '../lib/getNums';

export function useCorrectAnswer() {

   const [mistake, setMistake] = useState([]);

   const showAnswer = (mode, firstValue, secondValue, resultValue) => {
      let correctRes;

      const first = +firstValue.join(''),
            second = +secondValue.join(''),
            result = resultValue;

      if (mode == 'addition'){
         correctRes = createNumArr(first + second);

      } else if (mode == 'subtraction'){
         correctRes = createNumArr(first - second);

      } else if (mode == 'multiplication'){
         correctRes = createNumArr(first * second);
      }

      const inputNum = [];

      correctRes.forEach((el, id) => {
         if (result[id] !== el){
            inputNum.push(id);
         };
      })
      setMistake(inputNum);
   }

   const hideAnswer = () => {
      setMistake([]);
   }

   return {showAnswer, hideAnswer, mistake, setMistake};
}
