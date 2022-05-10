import React, { useEffect, useState } from 'react';
import {
  TextField,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Autocomplete,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

type CityOption = { label: string; id: number };

interface FormInterface {
  name: string;
  surname: string;
  age: string;
  city: CityOption[];
  gender: '' | 'female' | 'male';
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('Incorrect type.')
    .min(4, 'The minimum number of characters is 4.')
    .max(20, 'The maximum number of characters is 20.')
    .required('The value is required.'),
  surname: yup
    .string()
    .typeError('Incorrect type.')
    .min(4, 'The minimum number of characters is 4.')
    .max(20, 'The maximum number of characters is 20.')
    .required('The value is required.'),
  age: yup
    .number()
    .typeError('Incorrect type.')
    .min(18, 'You are not of legal age.')
    .max(140, 'You are probably dead.')
    .required('The value is required.'),
  city: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().required(),
        label: yup.string().required(),
      })
    )
    .min(1, 'Select at least one option.')
    .max(2, 'The maximum number of options has been exceeded.'),
  gender: yup.string().oneOf(['female', 'male'], 'Select the correct gender.'),
});

export function DemoForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<CityOption[]>([]);
  const { handleSubmit, handleBlur, values, handleChange, errors, touched, isValid, setFieldValue, setFieldTouched } =
    useFormik<FormInterface>({
      onSubmit(values) {
        console.log(values);
      },
      validationSchema,
      initialValues: { surname: '', name: '', age: '', city: [], gender: '' },
      validateOnMount: true,
    });

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOptions([
        { id: 1, label: 'Warsaw' },
        { id: 2, label: 'Berlin' },
        { id: 3, label: 'London' },
        { id: 4, label: 'Paris' },
      ]);
    }, 1000);
  }, []);

  return (
    <Card sx={{ width: '800px' }}>
      <CardHeader title="Demo form" subheader="Demo form using mui v5 and react-hook-form v7" />
      <form onSubmit={handleSubmit}>
        <CardContent sx={{ display: 'grid', gap: '16px' }}>
          <TextField
            name="name"
            fullWidth
            label="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!touched.name && !!errors.name}
            helperText={!!touched.name && errors.name}
          />
          <TextField
            name="surname"
            fullWidth
            label="Surname"
            value={values.surname}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!touched.surname && !!errors.surname}
            helperText={!!touched.surname && errors.surname}
          />
          <TextField
            name="age"
            fullWidth
            label="Age"
            value={values.age}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!touched.age && !!errors.age}
            helperText={!!touched.age && errors.age}
          />
          <Autocomplete<CityOption, boolean>
            multiple
            options={options}
            value={values.city}
            disabled={loading}
            onChange={(event, value) => {
              setFieldTouched('city');
              setFieldValue('city', value);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="City"
                error={!!touched.city && !!errors.city}
                helperText={!!touched.city && (errors.city as string)}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {params.InputProps.endAdornment}
                      {loading && <CircularProgress size={20} />}
                    </>
                  ),
                }}
              />
            )}
          />
          <FormControl variant="standard" error={!!touched.gender && !!errors.gender}>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              value={values.gender}
              onChange={(event, value) => {
                setFieldTouched('gender');
                setFieldValue('gender', value);
              }}
            >
              <FormControlLabel control={<Radio />} value="female" label="Female" />
              <FormControlLabel control={<Radio />} value="male" label="Male" />
              <FormControlLabel control={<Radio />} value="incorrect" label="Incorrect" />
            </RadioGroup>
            {!!touched.gender && !!errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
          </FormControl>
        </CardContent>
        <CardActions>
          <Button type="submit" disabled={!isValid} variant="contained">
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
