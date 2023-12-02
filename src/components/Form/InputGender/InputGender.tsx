import './InputGender.scss';

interface InputGenderProps {
  forwRef: React.RefObject<HTMLInputElement>[];
  error: string;
}

function InputsGender({ forwRef, error }: InputGenderProps) {
  return (
    <div className="form__control form__control_gender">
      <div className="control-gender__inner">
        <label className="control__label" htmlFor="input-male">
          Male
        </label>
        <input
          className="control__input input-gender"
          id="input-male"
          name="gender"
          type="radio"
          value="male"
          ref={forwRef[0]}
        />
        <label className="control__label" htmlFor="input-female">
          Female
        </label>
        <input
          className="control__input input-gender"
          id="input-female"
          name="gender"
          type="radio"
          value="female"
          ref={forwRef[1]}
        />
      </div>
      <div className="control__error">{error}</div>
    </div>
  );
}

export default InputsGender;
