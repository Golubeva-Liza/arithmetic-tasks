import { useMemo } from 'react';

const Inputs = ({state, count, mistake}) => {

   const elems = useMemo(() => {
      // console.log('меняем инcпуты');

      const arr = [];
      for (let i = 0; i <= count - 1; i++){
         arr.push(
            <input 
               className={ mistake && mistake.length > 0 && mistake.find(el => el == i) ? 'wrong' : '' }
               key={i}
               type="number" 
               value={state.value[i]} 
               onChange={(e) => state.onChange(e, i)}
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