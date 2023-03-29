import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: '100%',
    paddingTop: '100%',
    borderRadius: 0,
    '& > svg, & > img': {
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      margin: 'auto',
      objectFit: 'contain',
      objectPosition: 'top'
    }
  },
}));

export default useStyles;
