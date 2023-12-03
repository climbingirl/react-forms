import { UseFormRegister } from 'react-hook-form';
import { FormValues } from '../../../../types/form';

interface InputRegularProps {
  label: string;
  name: keyof FormValues;
  type: string;
  forwRef?: React.RefObject<HTMLInputElement>;
  error: string | undefined;
  register?: UseFormRegister<FormValues>;
}

function InputRegular({
  label,
  name,
  type,
  forwRef,
  error,
  register,
}: InputRegularProps) {
  let input;
  if (forwRef) {
    input = (
      <input id={name} type={type} className="control__input" ref={forwRef} />
    );
  } else if (register) {
    input = (
      <input
        id={name}
        type={type}
        className="control__input"
        {...register(name)}
      />
    );
  }

  return (
    <div className="form__control">
      <label htmlFor={name} className="control__label">
        {label}
      </label>
      {input}
      <div className="control__error">{error}</div>
    </div>
  );
}

export default InputRegular;
