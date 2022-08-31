
import { useMemo, useRef } from 'react';
import movingArrows from '../../lib/movingArrows';


const Inputs = ({state, count, mistake, disabled}) => {

   const itemRefs = useRef([]);

   const elems = useMemo(() => {
      
      const arr = [];
      for (let i = 0; i <= count - 1; i++){
         arr.push(
            <input 
               ref={el => itemRefs.current[i] = el}
               className={ mistake && mistake.length > 0 && mistake.find(el => el == i) ? 'input wrong' : 'input' }
               key={i}
               type="text" 
               disabled={disabled && i < disabled}
               value={state.value[i]} 
               onChange={(e) => state.onChange(e, i)}
               tabIndex={i == count - 1 ? 0 : -1}
               onKeyDown={(e) => movingArrows(e, i, itemRefs, count)}
            />
         )
      }
      return arr;
      
   }, [state.value, mistake])

   return elems;
};

export default Inputs;