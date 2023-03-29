import { NextPage } from 'next';
import Link from 'next/link';
import axios from 'axios';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { registerUser } from '../features/auth';
import { useAppDispatch } from '../store/hooks';

const validationSchema = yup.object({
  username: yup
    .string('Create a username')
    .min(5, 'Username should be of minimum 5 characters length')
    .required('Username is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required')
    .test(
      'Unique Email',
      'Email already in use', // <- key, message
      function (value) {
        return new Promise((resolve, reject) => {
          const user = {
            name: '', // Username
            values: {
              text2: '', // Password
              email: { email: value, text: value }, // Email
            },
          };
          axios
            .post(
              `/api/monday/verify-email`,
              { data: user },
              { headers: { 'Content-Type': 'application/json' } }
            )
            .then((res) => {
              resolve(true);
            })
            .catch((error) => {
              resolve(false);
            });
        });
      }
    ),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Register: NextPage = (props): JSX.Element => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (data) => {
      const user = {
        name: data.username, // Username
        values: {
          text2: data.password, // Password
          email: { email: data.email, text: data.email }, // Email
        },
      };
      dispatch(registerUser(user));
    },
  });

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name='username'
                required
                fullWidth
                id='username'
                label='Username'
                autoFocus
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/login'>
                <Typography variant='body2' sx={{ cursor: 'pointer' }}>
                  Already have an account? Login
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Register;
