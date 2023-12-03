import { useRef, useState } from 'react';
import InputRegular from '../../components/Form/elements/InputRegular/InputRegular';
import InputsGender from '../../components/Form/elements/InputGender/InputGender';
import InputConsent from '../../components/Form/elements/InputConsent/InputConsent';
import { useAppDispatch } from '../../hooks/redux';
import { addCard } from '../../store/cardsSlice';
import { useNavigate } from 'react-router-dom';
import InputFile from '../../components/Form/elements/InputFile/InputFile';
import { shema } from '../../utils/validation/shema';
import { getBase64 } from '../../utils/helpers';
import Form from '../../components/Form/Form';

function Unontrolled() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmedPasswordRef = useRef<HTMLInputElement>(null);
  const genderRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const consentRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const initialErrors: Record<string, string> = {
    name: '',
    age: '',
    email: '',
    password: '',
    confirmedPassword: '',
    gender: '',
    consent: '',
    image: '',
  };
  const [errors, setErrors] = useState(initialErrors);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value || null,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmedPassword: confirmedPasswordRef.current?.value,
      gender: genderRefs.find((g) => g.current?.checked === true)?.current
        ?.value,
      consent: consentRef.current?.checked,
      image: imageRef.current?.files,
    };

    try {
      const data = await shema.validate(formData, {
        abortEarly: false,
      });
      const cardData = {
        ...data,
        image: await getBase64((data.image as FileList)[0]),
      };
      setErrors(initialErrors);
      dispatch(addCard(cardData));
      navigate('/');
    } catch (err) {
      const validatedErr = err.inner.reduce((acc: object, err) => {
        console.log(err);
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
      <Form onSubmit={handleSubmit}>
        <InputRegular
          label="name"
          name="name"
          type="text"
          forwRef={nameRef}
          error={errors.name}
        />
        <InputRegular
          label="age"
          name="age"
          type="number"
          forwRef={ageRef}
          error={errors.age}
        />
        <InputRegular
          label="email"
          name="email"
          type="text"
          forwRef={emailRef}
          error={errors.email}
        />
        <InputRegular
          label="password"
          name="password"
          type="password"
          forwRef={passwordRef}
          error={errors.password}
        />
        <InputRegular
          label="confirm password"
          name="confirmedPassword"
          type="password"
          forwRef={confirmedPasswordRef}
          error={errors.confirmedPassword}
        />
        <InputsGender forwRef={genderRefs} error={errors.gender} />
        <InputConsent forwRef={consentRef} error={errors.consent} />
        <InputFile forwRef={imageRef} error={errors.image} />
        <button className="form__submit" type="submit">
          Submit
        </button>
      </Form>
    </section>
  );
}

export default Unontrolled;
