import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { useAppDispatch } from '../../hooks/redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormValues } from '../../types/form';
import { useForm } from 'react-hook-form';
import { addCard } from '../../store/cardsSlice';
import { CardModel } from '../../types/models';
import { shema } from '../../utils/validation/shema';
import InputRegular from '../../components/Form/elements/InputRegular/InputRegular';
import InputsGender from '../../components/Form/elements/InputGender/InputGender';
import InputConsent from '../../components/Form/elements/InputConsent/InputConsent';
import InputFile from '../../components/Form/elements/InputFile/InputFile';
import { getBase64 } from '../../utils/helpers';

function Controlled() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(shema),
  });

  async function onSubmit(data: FormValues) {
    const cardData: CardModel = {
      ...data,
      image: await getBase64(data.image[0]),
    };
    dispatch(addCard(cardData));
    navigate('/');
  }

  return (
    <section className="controlled">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputRegular
          label="name"
          name="name"
          type="text"
          error={errors?.name?.message}
          register={register}
        />
        <InputRegular
          label="age"
          name="age"
          type="number"
          error={errors?.age?.message}
          register={register}
        />
        <InputRegular
          label="email"
          name="email"
          type="text"
          error={errors?.email?.message}
          register={register}
        />
        <InputRegular
          label="password"
          name="password"
          type="password"
          error={errors?.password?.message}
          register={register}
        />
        <InputRegular
          label="confirm password"
          name="confirmedPassword"
          type="password"
          error={errors?.confirmedPassword?.message}
          register={register}
        />
        <InputsGender error={errors?.gender?.message} register={register} />
        <InputConsent error={errors?.consent?.message} register={register} />
        <InputFile error={errors?.image?.message} register={register} />
        <button className="form__submit" type="submit" disabled={!isValid}>
          Submit
        </button>
      </Form>
    </section>
  );
}

export default Controlled;
