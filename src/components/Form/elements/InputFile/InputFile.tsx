import { UseFormRegister } from 'react-hook-form';
import './InputFile.scss';
import { FormValues } from '../../../../types/form';

interface InputFileProps {
  forwRef?: React.RefObject<HTMLInputElement>;
  error: string | undefined;
  register?: UseFormRegister<FormValues>;
}

function InputFile({ forwRef, error, register }: InputFileProps) {
  let input;
  if (forwRef) {
    input = (
      <input
        id="image"
        type="file"
        className="control__input input-file"
        ref={forwRef}
      />
    );
  } else if (register) {
    input = (
      <input
        id="image"
        type="file"
        className="control__input input-file"
        {...register('image')}
      />
    );
  }

  return (
    <div className="form__control form__control_file">
      <label htmlFor="image" className="control__label">
        Image
      </label>
      {input}
      <div className="control__error">{error}</div>
    </div>
  );
}

export default InputFile;
