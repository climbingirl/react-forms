import { UseFormRegister } from 'react-hook-form';
import './InputConsent.scss';
import { FormValues } from '../../../../types/form';

interface InputConsentProps {
  forwRef?: React.RefObject<HTMLInputElement>;
  error: string | undefined;
  register?: UseFormRegister<FormValues>;
}

function InputConsent({ forwRef, error, register }: InputConsentProps) {
  let input;
  if (forwRef) {
    input = (
      <input
        id="consent"
        type="checkbox"
        className="control__input input-consent"
        ref={forwRef}
      />
    );
  } else if (register) {
    input = (
      <input
        id="consent"
        type="checkbox"
        className="control__input input-consent"
        {...register('consent')}
      />
    );
  }

  return (
    <div className="form__control form__control_consent">
      <div className="control-consent__inner">
        {input}
        <label htmlFor="consent" className="control__label">
          I accept terms and conditions
        </label>
      </div>

      <div className="control__error">{error}</div>
    </div>
  );
}

export default InputConsent;
