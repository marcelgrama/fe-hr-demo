import React, { FC, memo, useCallback, useReducer } from 'react';
import { useAppDispatch } from '../../store/hooks';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Avatar,
  Link,
} from '@mui/material';
import getSkills from '../../utils/getFreelancerSkills';
import useStyles from './style';

type ItemType = {
  id?: string;
  name?: string;
  profilePhoto?: string;
  skills?: string;
};

type ItemsType = {
  items?: any[];
};

type FreelancersDataType = {
  data?: ItemsType;
  pending: boolean;
  error: boolean;
};

interface IFreelancers {
  freelancersData: FreelancersDataType;
}

const FreelancersComponent: FC<IFreelancers> = memo(({ freelancersData }) => {
  const dispatch = useAppDispatch();

  const { data, pending, error } = freelancersData || {};
  const { items } = data || {};
  const classes = useStyles();

  const formatProfilePhoto = useCallback((profilePhoto: string) => {
    if (profilePhoto) {
      const url = profilePhoto
        .replace('/file/d/', '/uc?export=view&id=')
        .replace('/view?usp=drive_web', '');

      return url;
    }
    return '';
  }, []);

  const arrayOfItems = items && Object.values(items);

  return (
    <Container maxWidth='xl' className={classes.container}>
      {pending && (
        <Typography component='div' variant='h5'>
          Loading ...
        </Typography>
      )}
      {arrayOfItems &&
        arrayOfItems.length > 0 &&
        arrayOfItems.map((item: ItemType, index: number) => (
          <Grid item key={index} className={classes.cardWrapper}>
            <Card className={classes.card}>
              <Box className={classes.box}>
                <CardContent className={classes.cardContent}>
                  <Typography className={classes.nameTypo} variant='h5'>
                    {item?.name}
                  </Typography>
                  <div className={classes.skillsWrapper}>
                    {item?.skills &&
                      getSkills(item.skills).map(
                        (elem: string, index: number) => (
                          <Chip
                            key={index + elem}
                            label={elem ? elem : 'No Skills'}
                            size='small'
                            color='success'
                            className={classes.chip}
                          />
                        )
                      )}
                  </div>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pb: 2 }}>
                  <div aria-label='previous'>
                    <Link
                      className='btn btn-primary'
                      href={`/profile/${item.id}`}
                    >
                      View profile
                    </Link>
                  </div>
                </Box>
              </Box>
              <Avatar
                alt={item.name ?? ''}
                src={
                  item.profilePhoto ? formatProfilePhoto(item.profilePhoto) : ''
                }
                className={classes.avatar}
              />
            </Card>
          </Grid>
        ))}
      {error && (
        <Typography component='div' variant='h5'>
          Error ...
        </Typography>
      )}
    </Container>
  );
});

export default FreelancersComponent;
