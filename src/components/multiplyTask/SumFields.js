import "./multiplyTask.scss";
import { useState, useMemo, useEffect } from 'react';

import Inputs from "../input/Input";


const SumFields = ({ firstSum, secondSum, thirdSum, strokeCount }) => {
   return (
      strokeCount !== 1 ? (
         <div>
            <hr className="task__line" />

            <div className="task__top">
               <div className="task__sign">+</div>
               
               <div className="task__numbers">
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