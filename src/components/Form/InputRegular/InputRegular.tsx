interface InputRegularProps {
  name: string;
  type: string;
  forwRef: React.RefObject<HTMLInputElement>;
  error: string;
}

function InputRegular({ name, type, forwRef, error }: InputRegularProps) {
  return (
    <div className="form__control">
      <label htmlFor={name} className="control__label">
        {name}
      </label>
      <input id={name} type={type} className="control__input" ref={forwRef} />
      <div className="control__error">{error}</div>
    </div>
  );
}

export default InputRegular;
