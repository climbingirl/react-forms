import { useRef, useState } from 'react';
import InputRegular from '../../components/Form/InputRegular/InputRegular';
import InputsGender from '../../components/Form/InputGender/InputGender';
import InputConsent from '../../components/Form/InputConsent/InputConsent';
import * as yup from 'yup';
import { useAppDispatch } from '../../hooks/redux';
import { addCard } from '../../store/cardsSlice';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'The first letter must be capitalized'),
  age: yup.number().positive().required('Age is required'),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Must contain numeric, uppercase and lowercase letter, special character'
    )
    .required('Password is required'),
  gender: yup.string().required('Gender is required'),
  consent: yup
    .boolean()
    .oneOf([true], 'Accept terms and conditions is required'),
});

function Unontrolled() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
  const genderRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const consentRef = useRef<HTMLInputElement>(null);
  const initialErrors: Record<string, string> = {
    name: '',
    age: '',
    email: '',
    password: '',
    gender: '',
    consent: '',
  };
  const [errors, setErrors] = useState(initialErrors);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = {
      name: nameRef?.current?.value,
      age: ageRef?.current?.value || null,
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
      gender: genderRefs.find((g) => g.current?.checked === true)?.current
        ?.value,
      consent: consentRef?.current?.checked,
    };

    try {
      const data = await schema.validate(formData, { abortEarly: false });
      setErrors(initialErrors);
      dispatch(addCard(data));
      navigate('/');
    } catch (err) {
      console.log(err.inner);
      const validatedErr = err.inner.reduce((acc, err) => {
        return {
          ...acc,
          [err.path]: err.message,
        };
      }, {});
      setErrors(validatedErr);
    }
  }

  return (
    <section className="uncontrolled">
      <form method="post" className="form" onSubmit={handleSubmit}>
        <InputRegular
          name="name"
          type="text"
          forwRef={nameRef}
          error={errors.name}
        />
        <InputRegular
          name="age"
          type="number"
          forwRef={ageRef}
          error={errors.age}
        />
        <InputRegular
          name="Email"
          type="text"
          forwRef={emailRef}
          error={errors.email}
        />
        <InputRegular
          name="Password"
          type="password"
          forwRef={passwordRef}
          error={errors.password}
        />
        <InputRegular
          name="Password"
          type="password"
          forwRef={password2Ref}
          error={''}
        />
        <InputsGender forwRef={genderRefs} error={errors.gender} />
        <InputConsent forwRef={consentRef} error={errors.consent} />
        <button className="form__submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
}

export default Unontrolled;
