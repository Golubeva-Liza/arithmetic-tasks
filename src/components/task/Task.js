import './task.scss';
import { useState, useMemo, useEffect } from 'react';
import { useInput } from '../../hooks/useInput';
import useMessage from '../../hooks/useMessage';
import {createNumArr, createRandomNum} from '../../lib/getNums';
import {fieldsDefault, arithOperations} from '../../settings';

import Inputs from '../input/Input';
import Button from '../button/Button';
import Checkboxes from '../checkboxes/Checkboxes';
import MultiplyTask from '../multiplyTask/MultiplyTask';


const Task = ({mode}) => {
   const firstNum = useInput(fieldsDefault),
         secondNum = useInput(fieldsDefault),
         resultNum = useInput(fieldsDefault);

   const [mistake, setMistake] = useState([]);
   const {messageCode, setMessageCode, message} = useMessage();

   //чекбоксы для отметок
   const [checked, setChecked] = useState([]);


   useEffect(() => cleanFields(), [mode])


   const checkAnswer = () => {
      setMistake([]);

      const first = +firstNum.value.join(''),
            second = +secondNum.value.join(''),
            result = +resultNum.value.join('');

      // console.log(first, second, result);

      if (mode == 'addition'){
         first + second === result ? setMessageCode(1) : setMessageCode(2);

      } else if (mode == 'subtraction'){
         first - second === result ? setMessageCode(1) : setMessageCode(2);

      } else if (mode == 'multiplication'){
         first * second === result ? setMessageCode(1) : setMessageCode(2);
      }
   }

   const randomNums = () => {

      cleanFields();

      const first = createRandomNum(10, 1000);
      let second;

      if (mode == 'addition'){
         second = createRandomNum(10, 1000);

      } else if (mode == 'subtraction'){
         second = createRandomNum(10, first - 1);

      } else if (mode == 'multiplication'){
         second = createRandomNum(10, 100);
      }

      firstNum.setValue(createNumArr(first));
      secondNum.setValue(createNumArr(second));

      //числа максимум четырехзначные (настройка - сколько цифр в числах максимум или конкретно)
   }

   const cleanFields = () => {
      firstNum.setValue(fieldsDefault);
      secondNum.setValue(fieldsDefault);
      resultNum.setValue(fieldsDefault);
      setChecked([]);
      setMessageCode(0);
      setMistake([]);
   }

   const showAnswer = () => {
      let correctRes;

      if (mode == 'addition'){
         correctRes = createNumArr(+firstNum.value.join('') + +secondNum.value.join(''));

      } else if (mode == 'subtraction'){
         correctRes = createNumArr(+firstNum.value.join('') - +secondNum.value.join(''));

      } else if (mode == 'multiplication'){
         correctRes = createNumArr(+firstNum.value.join('') * +secondNum.value.join(''));
      }

      const inputNum = [];

      correctRes.forEach((el, id) => {
         if (resultNum.value[id] !== el){
            inputNum.push(id);
         };
      })
      setMistake(inputNum);
   }

   const hideAnswer = () => {
      setMistake([]);
   }


   return (
      <div className="main">
         <div className="main__change-task">
            <Button light onClick={randomNums}>сгенерировать пример</Button>
         </div>

         {mode == 'multiplication' ?   
            <MultiplyTask 
               firstNum={firstNum} 
               secondNum={secondNum} 
               resultNum={resultNum}
               mistake={mistake}/> 
            : (
            <div className="task">
               <div className="task__top">
                  <div className="task__sign">{arithOperations[mode].sign}</div>
                  <div className="task__numbers">
                     <Checkboxes 
                        className={`task__checkboxes ${mode == 'subtraction' ? 'task__checkboxes_minus' : ''}`}
                        checked={checked} setChecked={setChecked}
                     />                        

                     <Inputs state={firstNum} count={7} />
                     <Inputs state={secondNum} count={7} />
                  </div>
               </div>

               <hr className="task__line"/>

               <div className="task__answer task__numbers">
                  <Inputs state={resultNum} count={7} mistake={mistake}/>
               </div>
            </div>
         )}

         <div className="main__verify">
            {message}

            {messageCode == 2 ? (
               <Button light 
                  className="main__show-answer"
                  onClick={mistake.length ? hideAnswer : showAnswer}>
                  {mistake.length ? 'спрятать подсказку' : 'показать подсказку'}
               </Button>
            ) : null}
            
            <Button
               disabled={firstNum.value.join('') == '' || secondNum.value.join('') == '' || resultNum.value.join('') === ''}
               onClick={messageCode == 1 ? cleanFields : checkAnswer}>
               {messageCode == 1 ? 'очистить поля' : 'проверка решения'}
            </Button>
            
         </div>
      </div>
   );
};

export default Task;