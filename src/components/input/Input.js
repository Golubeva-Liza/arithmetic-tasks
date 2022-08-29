import { useMemo, useRef } from 'react';

const Inputs = ({state, count, mistake}) => {

   const itemRefs = useRef([]);

   const onKeyDown = (e, id) => {
      // e.preventDefault();

      if (e.code == 'ArrowDown') {
         if (id === 0){ return; }
         itemRefs.current[id - 1].focus();

      } else if (e.code == 'ArrowUp'){
         if (id === count - 1){ return; }
         itemRefs.current[id + 1].focus();
      }
      // console.log(e.code);
   }

   const elems = useMemo(() => {

      const arr = [];
      for (let i = 0; i <= count - 1; i++){
         arr.push(
            <input 
               ref={el => itemRefs.current[i] = el}
               className={ mistake && mistake.length > 0 && mistake.find(el => el == i) ? 'wrong' : '' }
               key={i}
               type="text" 
               value={state.value[i]} 
               onChange={(e) => state.onChange(e, i)}
               tabIndex={i == count - 1 ? 0 : -1}
               onKeyDown={(e) => onKeyDown(e, i)}
            />
         )
      }
      return arr;
   }, [state.value, mistake])

   return (
      elems
   );
};

export default Inputs;