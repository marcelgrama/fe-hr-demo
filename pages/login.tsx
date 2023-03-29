import { useEffect, FormEventHandler } from 'react';
import { signIn, useSession } from 'next-auth/react';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import Link from 'next/link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { NextPage } from 'next/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser } from '../features/auth';

const Login: NextPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await signIn('credentials', {
      email: data.get('email'),
      password: data.get('password'),
      redirect: false, // TOBE DETERMINED
    });
  };

  const { data, status } = useSession();

  useEffect(() => {
    status === 'authenticated' && dispatch(loginUser({ data, status }));
  }, [status]);

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
          Login
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                inputProps={{
                  maxLength: 100,
                  pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$*',
                }}
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
                autoComplete='new-password'
                inputProps={{ minLength: 8, maxLength: 20 }}
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
            Login
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/register'>
                <Typography variant='body2' sx={{ cursor: 'pointer' }}>
                  Don't have an account? Register
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
