import * as yup from 'yup';

export const controlledFormShema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'The first letter must be capitalized'),
  age: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .positive()
    .required('Age is required'),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Weak password. It must contain numeric, uppercase and lowercase letter, special character'
    ),
  confirmedPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirmed password is required'),
  gender: yup.string().required('Gender is required'),
  consent: yup
    .boolean()
    .oneOf([true], 'Accept terms and conditions is required'),
  image: yup
    .mixed()
    .required('Image is required')
    .test(
      'is-valid-size',
      'Maximum allowed image size is 100KB',
      (value) => value[0] && value[0].size <= 102400
    )
    .test(
      'is-valid-type',
      'Allow only jpeg and png image file extension',
      (value) => ['image/jpeg', 'image/png'].includes(value[0] && value[0].type)
    ),
});
