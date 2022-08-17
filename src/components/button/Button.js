import './button.scss';

const Button = ({children, light, className, onClick, disabled}) => {

   return (
      <button 
         className={`button ${light ? 'button_light' : ''} ${className ? className : ''}`}
         onClick={onClick}
         disabled={disabled}>
         {children}
      </button>
   );
};

export default Button;