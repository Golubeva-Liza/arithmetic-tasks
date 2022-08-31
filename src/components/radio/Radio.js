import './radio.scss';
import { arithOperations } from '../../settings';

const Radio = ({name, value, radio, setRadio}) => {

   return (
      <label className="radio mode__radio">
         <input 
            className="radio__input"
            type="radio" 
            name={name}
            value={value}
            checked={radio === value ? true : false}
            onChange={() => setRadio(value)}
         />
         <span className="radio__check"></span>
         {arithOperations[value].translate}
      </label>
   );
};

export default Radio;


//arithOperations.find(item => item.translate === text.toLowerCase()).name