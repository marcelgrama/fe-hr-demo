import React, { FC, memo } from 'react';
import { Container, Typography, Grid, Chip, Avatar, Button, Box } from '@mui/material';
import { AttachMoney, LocationOn, AccessTime, AccessibilityNew } from '@mui/icons-material';
import useStyles from './style';

type JobsDataType = {
  aboutClient?: string;
  aboutPosition?: string;
  availabilityNeeded?: string;
  budget?: string;
  desiredSkills?: string;
  endDate?: string;
  id?: string;
  name?: string;
  requirements?: string;
  startDate?: string;
};

interface IJobs {
  data: JobsDataType;
}

const JobDescriptionComponent: FC<IJobs> = ({ data }: IJobs) => {
  const {
    name,
    aboutClient,
    aboutPosition,
    requirements,
    desiredSkills,
    budget,
    startDate,
    endDate,
    availabilityNeeded,
  } = data || {};
  const classes = useStyles();

  const monthDiff = (d1: Date, d2: Date) => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  };

  const skills = desiredSkills?.split(',').map(e => { return e.trim() })

  return (
    <>
      <Grid item sx={{ bgcolor: 'primary.black', color: 'primary.white', py: { xs: 4, md: 12 }, pt: { xs: 1 } }}>
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
            </Grid>
            <Grid item xl={10} md={9} sm={6} xs={12}>
              <Grid item sx={{ mb: 5 }}>
                <Typography sx={{ fontWeight: '600', fontSize: '24px' }}>{name}</Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontWeight: '600', mb: 1 }}>
                  About the client
                </Typography>
              </Grid>
              <Grid item sx={{ mb: 3 }}>
                <Typography sx={{ fontWeight: '400' }}>
                  {aboutClient}
                </Typography>
              </Grid>
              <Grid container sx={{ mb: 3 }}>
                <Box>
                  <Button color="primary">
                    Apply Now
                  </Button>
                  <Button color="secondary">
                    Refer a friend
                  </Button>
                </Box>

              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid sx={{ bgcolor: 'primary.gray' }}>
        <Container maxWidth='lg'>
          <Grid container sx={{ py: 8, bgcolor: 'primary.white' }}>
            <Grid item md={10} xs={12} sx={{ mx: 'auto', px: { xs: 2 } }} >
              {aboutPosition &&
                <Box>
                  <Typography sx={{ fontWeight: '600', mb: 2 }}>
                    Project Description
                  </Typography>
                  <Typography>
                    {aboutPosition}
                  </Typography>
                </Box>
              }
            </Grid>
            <Grid item container md={10} xs={12} sx={{ mx: 'auto', mt: 7, px: { sm: 2 } }} >
              <Grid item container sx={{ mx: { xs: 0, md: -2 } }}>
                <Grid item md={6} xs={12} sx={{ mr: 'auto', px: { xs: 2 }, mb: { xs: 4, md: 0 } }} >
                  {requirements && <Box>
                    <Typography sx={{ fontWeight: '600', mb: 2 }}>
                      Requirements
                    </Typography>
                    <Typography>
                      {requirements}
                    </Typography>
                  </Box>}
                </Grid>
                <Grid item md={5} xs={12} sx={{ ml: 'auto', px: { xs: 2 } }} >
                  <Box sx={{ border: '1px solid #D9D9D9', borderRadius: 2, p: 3 }}>
                    <Box>
                      <Typography sx={{ fontWeight: '600', mb: 2 }}>
                        Required skills
                      </Typography>
                      <Box sx={{ ml: '-3px' }}>
                        {skills &&
                          skills.map(
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
                      </Box>
                    </Box>
                    <Box sx={{ mx: -3, borderTop: '1px solid #D9D9D9', my: 3 }}></Box>
                    <Box>
                      <Grid container alignItems="center">
                        <Grid item sx={{ pl: { xs: 0, sm: 1 }, pt: 1, pr: { xs: 2, sm: 0 } }} md={2}>
                          <AttachMoney />
                        </Grid>
                        <Grid item md={10}>
                          <Typography sx={{ fontWeight: '600' }}>
                            Rate
                          </Typography>
                          <Typography>
                            {budget ? budget : 'We work with your own rate'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ mx: -3, borderTop: '1px solid #D9D9D9', my: 3 }}></Box>
                    <Box>
                      <Grid container alignItems="center">
                        <Grid item sx={{ pl: { xs: 0, sm: 1 }, pt: 1, pr: { xs: 2, sm: 0 } }} md={2}>
                          <LocationOn />
                        </Grid>
                        <Grid item md={10}>
                          <Typography sx={{ fontWeight: '600' }}>
                            Location
                          </Typography>
                          <Typography>
                            Remote
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ mx: -3, borderTop: '1px solid #D9D9D9', my: 3 }}></Box>
                    <Box>
                      <Grid container alignItems="center">
                        <Grid item sx={{ pl: { xs: 0, sm: 1 }, pt: 1, pr: { xs: 2, sm: 0 } }} md={2}>
                          <AccessTime />
                        </Grid>
                        <Grid item md={10}>
                          <Typography sx={{ fontWeight: '600' }}>
                            Duration
                          </Typography>
                          <Typography>
                            {startDate &&
                              endDate &&
                              monthDiff(new Date(startDate), new Date(endDate))}{' '}
                            months+
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ mx: -3, borderTop: '1px solid #D9D9D9', my: 3 }}></Box>
                    <Box>
                      <Grid container alignItems="center">
                        <Grid item sx={{ pl: { xs: 0, sm: 1 }, pt: 1, pr: { xs: 2, sm: 0 } }} md={2}>
                          <AccessibilityNew />
                        </Grid>
                        <Grid item md={10}>
                          <Typography sx={{ fontWeight: '600' }}>
                            Commitment
                          </Typography>
                          <Typography>
                            {availabilityNeeded}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </>

  );
};

export default memo(JobDescriptionComponent);
