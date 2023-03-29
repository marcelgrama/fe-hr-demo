import React, { FC, useState, SyntheticEvent , memo} from 'react';
import { profileEditor } from './../../features/freelanceProfileForms';
import { useAppDispatch } from '../../store/hooks';
import {
  Button,
  Avatar,
  Typography,
  Grid,
  Chip,
  Link,
  Box,
  Tab,
  Tabs,
  Container,
  List,
  ListItem,
} from '@mui/material';
import {
  GitHub as GitHub,
} from '@mui/icons-material';
import getSkills from '../../utils/getFreelancerSkills';
import { useFreelancerExperience } from '../../hooks/useFreelancerExperience';
import LinkedinIco from './../../assets/icons/linkedin';
import MarkerIco from './../../assets/icons/marker';

import useStyles from './style';

import EditProfileFreelance from './../EditProfileForm/Freelancer/EditProfileFreelance';

interface IFreelancer {
  data: FreelancerDataType;
  skills: string[];
}

type FreelancerDataType = {
  freelancerId: string;
  name: string;
  freelancerExperience: string[];
  freelancerData: {
    title: string;
    location: string | boolean | null;
    yearsOfExperience: string | null;
    profileDescription: string;
    phone: string;
    email: string;
    linkedIn: string;
  };
};

type TabIndexes = { [index: string]: string };

const ProfileComponent: FC<IFreelancer> = ({ data, skills }) => {
  const dispatch = useAppDispatch();
  const { name, freelancerData, freelancerExperience } = data || {};
  const {
    title,
    location,
    yearsOfExperience,
    profileDescription,
    phone,
    email,
    linkedIn,
  } = freelancerData;

  const classes = useStyles();
  const [steps] = useFreelancerExperience(freelancerExperience);
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const showDialog = () => {
    dispatch(profileEditor(true));
  }

  const closeDialog = () => {
    dispatch(profileEditor(false));
  }

  const tabIndexes: TabIndexes = {
    '0': 'Experience.',
    '1': 'Education.',
  };

  return (
    <>
      <Grid sx={{ bgcolor: 'primary.black', color: 'primary.white', py: { xs: 4, md: 12 }, pt: { xs: 1 } }}>
        <EditProfileFreelance />
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
          >
            <Grid
              container
              item
              xl={2}
              md={3}
              sm={6}
              xs={12}
              sx={{ alignSelf: 'flex-start', flexWrap: 'wrap' }}
            >
              <Grid item sx={{ width: 1, mb: 3 }}>
                <Avatar
                  alt='Remy Sharp'
                  variant='rounded'
                  className={classes.avatar}
                  sx={{ width: 1 }}
                ></Avatar>
              </Grid>
              <Grid item sx={{ width: 1 }}>
                <Button color="primary" sx={{ minWidth: '100%' }} onClick={showDialog} >
                  Hire {name.split(" ")[0]}
                </Button>
              </Grid>
            </Grid>
            <Grid item xl={3} md={4} sm={6} xs={12}>
              <Grid item>
                <Typography className="font-md font-600">{name}</Typography>
              </Grid>
              <Grid item sx={{ mb: 3 }}>
                <Typography className="font-sm font-600">
                  {title}
                </Typography>
              </Grid>
              <Grid container sx={{ mb: 3 }}>
                <MarkerIco />
                <Typography
                  sx={{ ml: 1, mb: 0 }}
                  className="font-xs font-400"
                  gutterBottom
                >
                  {location ?? 'Remote'}
                </Typography>
              </Grid>
              <Grid container direction='column' sx={{ mb: 3 }}>
                <Typography className="font-sm font-600">Phone:</Typography>
                <Typography
                  className="font-sm font-400"
                  gutterBottom
                >
                  {phone}
                </Typography>
              </Grid>
              <Grid container direction='column' sx={{ mb: 3 }}>
                <Typography className="font-sm font-600" >Email:</Typography>
                <Typography
                  className="font-sm font-600 white"
                  gutterBottom
                >
                  {email}
                </Typography>
              </Grid>
              <Grid container direction='column'>
                <Grid item>
                  <Typography className="font-sm font-600">Social:</Typography>
                </Grid>
                <Grid item>
                  <Link href={linkedIn} target='_blank' rel='noreferrer' className={classes.socialIcon}>
                    <LinkedinIco />
                  </Link>
                  <Link href="#" target='_blank' rel='noreferrer' className={classes.socialIcon}>
                    <GitHub />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xl={7} md={5}>
              <Grid item sx={{ mb: 4 }}>
                <Typography className="font-md font-600">
                  About
                </Typography>
                <Typography className="font-sm font-400">
                  {profileDescription}
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ mb: 2 }} className="font-md font-600">
                  Skills
                </Typography>
                <Grid sx={{ ml: '-5px' }} >
                  {skills &&
                    getSkills(skills.toString()).map(
                      (elem: string, index: number) => (
                        <Chip
                          key={index + elem}
                          label={elem ? elem : 'No Skills'}
                          size='medium'
                          color='secondary'
                          sx={{ m: '5px !important' }}
                        />
                      )
                    )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Box sx={{ mt: '-1px' }}>
        <Grid sx={{ bgcolor: 'primary.black' }}>
          <Container maxWidth="lg">
            <Grid>
              <Typography className={classes.tabSelectionTypo}>
                {tabIndexes[value.toString()]}
              </Typography>
            </Grid>
            <Box sx={{ bgcolor: '#000', pb: '1px' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant='scrollable'
                scrollButtons="auto"
                allowScrollButtonsMobile
                aria-label='scrollable force tabs example'
                sx={{ mb: '-1px' }}
                TabIndicatorProps={{ style: { background: '#fff', height: 5 } }}
              >
                <Tab className='primary' label='Experience' />
                <Tab className='primary' label='Education' />
              </Tabs>
            </Box>
          </Container>
        </Grid>
        <Grid sx={{ bgcolor: 'primary.gray' }}>
          <Container>
            <Grid container sx={{ py: 8, bgcolor: 'primary.white' }}>
              <Grid md={10} xs={12} sx={{ mx: 'auto', px: { sm: 2 } }} >
                {tabIndexes[value.toString()] === 'Experience.' && (
                  <Box className={classes.stepper}>
                    {steps.map((step, index) => (
                      <Grid className="item" sx={{ pb: '30px' }}>
                        <Typography className="font-md font-600">{step.label.split('#')[0]}</Typography>
                        <Typography className="font-sm">{step.label.split('#')[1]}</Typography>
                        <List sx={{ m: 0, py: 1, ml: '20px' }}>
                          <ListItem sx={{ pl: 1 }}>
                            <Typography>{step.description}</Typography>
                          </ListItem>
                        </List>
                      </Grid>
                    ))}
                  </Box>
                )}
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Box>
    </>
  );
};

export default memo(ProfileComponent);
