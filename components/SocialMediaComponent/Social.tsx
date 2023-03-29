import { Grid } from '@mui/material';

import {
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

import { socialMedia } from '../../utils/constants/socialMedia';
import useStyles from './social.style';

interface SocialType {
  color?: string;
}

const Social = ({ color }: SocialType) => {
  const classes = useStyles();
  const { instagram, facebook, homepage } = socialMedia;

  return (
    <Grid item container spacing={2} justifyContent='center'>
      <Grid
        item
        component={'a'}
        target='_blank'
        rel='noreferrer noopener'
        href={homepage}
      >
        <HomeIcon
          className={classes.snsIcon}
          color={color ? 'primary' : 'secondary'}
        />
      </Grid>
      <Grid
        item
        component={'a'}
        target='_blank'
        rel='noreferrer noopener'
        href={facebook}
      >
        <FacebookIcon
          className={classes.snsIcon}
          color={color ? 'primary' : 'secondary'}
        />
      </Grid>
      <Grid
        item
        component={'a'}
        target='_blank'
        rel='noreferrer noopener'
        href={instagram}
      >
        <InstagramIcon
          className={classes.snsIcon}
          color={color ? 'primary' : 'secondary'}
        />
      </Grid>
    </Grid>
  );
};

export default Social;
