import { useState } from "react";
import {createNumArr} from '../lib/getNums';

export function useCorrectAnswer() {

   const [mistake, setMistake] = useState([]);

   const showAnswer = (mode, firstValue, secondValue, resultValue) => {
      let correctRes;

      if (mode == 'addition'){
         correctRes = createNumArr(+firstValue.join('') + +secondValue.join(''));

      } else if (mode == 'subtraction'){
         correctRes = createNumArr(+firstValue.join('') - +secondValue.join(''));

      } else if (mode == 'multiplication'){
         correctRes = createNumArr(+firstValue.value.join('') * +secondValue.join(''));
      }

      const inputNum = [];

      correctRes.forEach((el, id) => {
         if (resultValue[id] !== el){
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
