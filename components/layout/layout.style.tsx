import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    width: `100%`,
    position: 'relative',
    overflow: 'hidden',
    marginTop: '6em',
    padding: '2em 0 ',
  },
  link: {
    fontSize: '1.25em',
    color: '#fff',
    '&:hover': {
      color: theme.palette.info.main,
    },
  },
  copylight: {
    color: '#fff',
    fontSize: '1em',
    '&:hover': {
      color: theme.palette.info.main,
    },
  },
  toolbarMargin: {
    marginBottom: `4em`,
    [theme.breakpoints.down('md')]: {
      marginBottom: '4em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '2em',
    },
  },
  logo: {
    width: 'max-content',
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawerIcon: {
    height: `40px`,
    width: `40px`,
    color: `#fff`,
    [theme.breakpoints.down('xs')]: {
      height: `40px`,
      width: `40px`,
    },
  },
  drawer: {
    backgroundColor: theme.palette.secondary.main,
    padding: '0 6em',
  },
  mastcontent: {
    paddingTop: '80px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '75px',
    },
  }
}));

export default useStyles;
