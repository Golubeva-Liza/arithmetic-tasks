import './radio.scss';

const Radio = ({name, text, radio, setRadio}) => {

   return (
      <label className="radio mode__radio">
         <input 
            className="radio__input"
            type="radio" 
            name={name}
            value={text}
            checked={radio === text ? true : false}
            onChange={() => setRadio(text)}
         />
         <span className="radio__check"></span>
         {text}
      </label>
   );
};

export default Radio;