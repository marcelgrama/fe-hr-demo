import { makeStyles } from '@mui/styles';
import { Theme } from "@mui/system";

const useStyles = makeStyles((theme: Theme)=>({
   snsIcon: {
    width: "30px",
    height: "30px",
    [theme.breakpoints.down("xs")]: {
      width: "25px",
      height: "25px",
    },
    "&:hover": {
      color: theme.palette.info.main,
    },
  },
}));

export default useStyles;