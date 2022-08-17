import './task.scss';
import { useState, useMemo } from 'react';
import Checkboxes from '../checkboxes/Checkboxes';
import { useInput } from '../../hooks/useInput';
import Inputs from '../input/Input';
import Button from '../button/Button';
import {Right, Wrong, Arrow} from '../../resources';


const Task = ({mode}) => {
   const firstNum = useInput(['', '', '', '', '', '', '']),
         secondNum = useInput(['', '', '', '', '', '', '']),
         resultNum = useInput(['', '', '', '', '', '', '']);

   //0 - нет сообщения, 1 - правильно, 2 - неправильно, 3 - некорректно введены числа
   const [messageCode, setMessageCode] = useState(0);

   // useEffect(() => {
   //    if (resultNum){
   //       console.log(resultNum.value, resultNum.value.join(''));
   //    }
      
   // }, [resultNum.value])

   const checkAnswer = () => {
      const first = +firstNum.value.join(''),
            second = +secondNum.value.join(''),
            result = +resultNum.value.join('');

      console.log(first, second, result);

      if (mode == 'Сложение'){
         first + second === result ? setMessageCode(1) : setMessageCode(2);

      } else if (mode == 'Вычитание'){
         first - second === result ? setMessageCode(1) : setMessageCode(2);
      }
   }

   const randomNums = () => {
      // const first = +firstNum.value.join(''),
      //       second = +secondNum.value.join(''),
      //       result = +resultNum.value.join('');

      // console.log(first, second, result);

      //1) числа максимум четырехзначные (настройка - сколько цифр в числах максимум или конкретно)
      //2) при сложении первое число любое, второе - любое, при вычитании - второе меньше первого.
   }

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


   return (
      <div className="main">
         <div className="main__change-task">
            <Button light onClick={randomNums}>сгенерировать пример</Button>
         </div>

         <div className="task">
            <div className="task__top">
               <div className="task__sign">{mode == 'Сложение' ? '+' : '-'}</div>
               <div className="task__numbers">
                  <Checkboxes className={`task__checkboxes ${mode == 'Вычитание' ? 'task__checkboxes_minus' : ''}`}/>                        

                  <Inputs state={firstNum} count={7} />
                  <Inputs state={secondNum} count={7} />
               </div>
            </div>

            <hr className="task__line"/>

            <div className="task__answer task__numbers">
               <Inputs state={resultNum} count={7} />
            </div>
         </div>

         <div className="main__verify">
            {message}
            
            <Button
               disabled={firstNum.value.join('') == '' || secondNum.value.join('') == '' || resultNum.value.join('') === ''}
               onClick={checkAnswer}>
               проверка решения
            </Button>
         </div>
      </div>
   );
};

export default Task;