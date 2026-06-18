import type {colors} from '../types_&_enums.tsx'

export const Square = (
  {isPressed, buttonSelected, color} : 
  {isPressed?: boolean, buttonSelected: () => void, color: colors}) => {

    const className = `square ${color} ${(isPressed ? "is-selected" : "")}`.trim();
    const handleClick = () => {buttonSelected()}

    return (
      <div className={className} onClick={handleClick}></div>
    )
  };
