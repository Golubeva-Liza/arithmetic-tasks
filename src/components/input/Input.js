import { useMemo } from 'react';

const Inputs = ({state, count}) => {

   const creatingInputs = () => {
      const arr = [];
      for (let i = 0; i <= count - 1; i++){
         arr.push(
            <input 
               key={i}
               type="number" 
               value={state.value[i]} 
               onChange={(e) => state.onChange(e, i)}
            />
         )
      }
      return arr;
   }

   const elems = useMemo(() => creatingInputs(), [state])

   return (
      elems
   );
};

export default Inputs;