import { Container, Grid, Typography, Button } from '@mui/material';

const Index = (props: any) => {

  return (
    <Container maxWidth='md'>
      <Typography
        variant='h1'
        align='center'
        gutterBottom
        style={{ marginBottom: '1em' }}
      >
      HR PLATFORM
      </Typography>
      <Grid container direction='column' alignItems='center' spacing={4}>
        <Grid item>
          <Button
            component={'a'}
            target='_blank'
            rel='noreferrer noopener'
            href='/'
          >
            Get Started
          </Button>
        </Grid>
        <Grid item>
          <Container maxWidth='sm'>
            <Typography variant='h2' align='center'>
              Lorem ipsum dolor
            </Typography>
          </Container>
        </Grid>
        <Grid item>
          <img
            src='https://hrplatform.ro/wp-content/uploads/2018/11/header_hrplatform.png'
            alt='img'
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;
