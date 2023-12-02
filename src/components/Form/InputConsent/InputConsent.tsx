import './InputConsent.scss';

interface InputConsentProps {
  forwRef: React.RefObject<HTMLInputElement>;
  error: string;
}

function InputConsent({ forwRef, error }: InputConsentProps) {
  return (
    <div className="form__control form__control_consent">
      <div className="control-consent__inner">
        <input
          id="consent"
          type="checkbox"
          className="control__input input-consent"
          ref={forwRef}
        />
        <label htmlFor="consent" className="control__label">
          I accept terms and conditions
        </label>
      </div>

      <div className="control__error">{error}</div>
    </div>
  );
}

export default InputConsent;
