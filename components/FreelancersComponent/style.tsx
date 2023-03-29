import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  cardWrapper: {
    width: 300,
    marginBottom: 10,
  },
  avatar: ({ colorCode }) => ({
    width: 100,
    height: 100,
    marginTop: "16px",
    alignSelf: "center",
    boxShadow: "0px 0px 5px 4px lightgreen",
  }),
  nameTypo: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    textAlign: "center",
  },
  card: {
    display: "flex",
    height: "100%",
    flexDirection: "column-reverse",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
  cardContent: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
  },
  skillsWrapper: {
    justifyContent: "center",
    flexDirection: "row",
  },
  chip: {
    width: "max-content",
    margin: "2px",
  },
}));

export default useStyles;
