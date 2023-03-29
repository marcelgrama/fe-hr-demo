import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) => ({
  stepper: {
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '40px',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '60px',
    },
    '& > .item': {
      position: 'relative',
      '& li': {
        display: 'list-item',
        listStyle: 'disc'
      },
      '&:before': {
        content: '""',
        position: 'absolute',
        left: -35,
        top: 8,
        width: '10px',
        height: '10px',
        borderRadius: '100px',
        backgroundColor: '#D9D9D9'
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        top: 8,
        left: -30,
        height: '100%',
        width: 0,
        borderRight: '1px dashed #D9D9D9'
      },
      '&:last-child': {
        paddingBottom: 0,
        '&:after': {
          content: 'none'
        }
      }
    }
  },
  avatar: {
    width: '100%',
    paddingTop: '100%',
    borderRadius: 6,
    '& > svg, & > img': {
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      margin: 'auto',
      objectFit: 'cover',
      objectPosition: 'center'
    }
  },

  socialIcon: {
    color: theme.palette.primary.white,
    width: 32,
    height: 32,
    display: 'inline-block',
    borderRadius: 100,
    position: 'relative',
    margin: 5,
    '&:before': {
      content: '""',
      position: 'absolute',
      width: 28,
      height: 28,
      borderRadius: '100px',
      margin: 'auto',
      background: 'transparent',
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
      boxShadow: '0 0 0 0px white',
      transition: '0.15s'
    },
    '&:hover': {
      '&:before': {
        boxShadow: '0 0 0 5px white'
      }
    },
    '&:first-child': {
      marginLeft: 0
    },
    '& > svg': {
      width: '100%',
      height: '100%',
      transition: '0.15s',
      borderRadius: '100%',
    }
  },
  tabSelectionTypo: {
    color: theme.palette.primary.black800,
    fontWeight: 'bold',
    userSelect: 'none',
    fontSize: '128px',
    [theme.breakpoints.down('lg')]: {
      fontSize: '14vw',
    },
  },

}));

export default useStyles;
