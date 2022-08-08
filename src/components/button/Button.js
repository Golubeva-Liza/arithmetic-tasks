import './button.scss';

const Button = ({children, light, className, onClick}) => {

   return (
      <button 
         className={`button ${light ? 'button_light' : ''} ${className}`}
         onClick={onClick}>
         {children}
      </button>
   );
};

export default Button;