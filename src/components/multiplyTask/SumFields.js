import "./multiplyTask.scss";
import { useState, useMemo, useEffect } from 'react';

import Inputs from "../input/Input";
import Checkboxes from '../checkboxes/Checkboxes';


const SumFields = ({ firstSum, secondSum, thirdSum, strokeCount, checked, setChecked}) => {
   return (
      strokeCount !== 1 ? (
         <div>
            <hr className="task__line" />

            <div className="task__top">
               <div className="task__sign">+</div>
               
               <div className="task__numbers">
                  <Checkboxes 
                     className={`task__checkboxes`}
                     checked={checked} setChecked={setChecked}
                  /> 
                  <Inputs state={firstSum} count={7}/>
                  <Inputs state={secondSum} count={7}/>
                   
                  {strokeCount === 3 ? <Inputs state={thirdSum} count={7}/> : null}
               </div>
            </div>
         </div>
      ) : null
   );
};

export default SumFields;