import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  paperWrapper: {
    marginBottom: 10,
  },
  paper: {
    minHeight: 100,
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    justifyContent: 'space-between',
    padding: '0 20px',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  gridItemWidth: {
    width: 200,
  },
}));

export default useStyles;
