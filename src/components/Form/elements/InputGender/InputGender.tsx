import { UseFormRegister } from 'react-hook-form';
import { FormValues } from '../../../../types/form';
import './InputGender.scss';

interface InputGenderProps {
  forwRef?: React.RefObject<HTMLInputElement>[];
  error: string | undefined;
  register?: UseFormRegister<FormValues>;
}

function InputsGender({ forwRef, error, register }: InputGenderProps) {
  const genders = ['male', 'female'];
  let inputs;
  if (forwRef) {
    inputs = genders.map((gender, index) => (
      <input
        className="control__input input-gender"
        id={`input-${gender}`}
        name="gender"
        type="radio"
        value={gender}
        ref={forwRef[index]}
        key={index}
      />
    ));
  } else if (register) {
    inputs = genders.map((gender, index) => (
      <input
        className="control__input input-gender"
        id={`input-${gender}`}
        type="radio"
        value={gender}
        key={index}
        {...register('gender')}
      />
    ));
  }

  return (
    <div className="form__control form__control_gender">
      <div className="control-gender__inner">
        <label className="control__label" htmlFor="input-male">
          Male
        </label>
        {(inputs as JSX.Element[])[0]}
        <label className="control__label" htmlFor="input-female">
          Female
        </label>
        {(inputs as JSX.Element[])[1]}
      </div>
      <div className="control__error">{error}</div>
    </div>
  );
}

export default InputsGender;
