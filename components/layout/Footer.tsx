import Link from "../LinkComponent/Link";
import { useRouter } from "next/router";

import useStyles from './layout.style'
import { Container, Grid, Typography } from "@mui/material";

import { routes } from "../../utils/constants/routes";
import Social from "../SocialMediaComponent/Social";


const Footer = (props: any) => {
  const classes = useStyles();
  const path = routes;
  const router = useRouter();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          {path.map(({ name, link }) => (
            <Grid item key={link}>
              <Link href={link} {...props}>
                <Typography
                  className={classes.link}
                >
                  {name}
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
        <Grid container direction="column" style={{ margin: "1.2em 0" }}>
          <Social />
        </Grid>
        <Grid
          item
          container
          component={"a"}
          target="_blank"
          rel="noreferrer noopener"
          href="https://satoruakiyama.com"
          justifyContent="center"
          style={{
            textDecoration: "none",
          }}
        >
          <Typography className={classes.copylight}>
            &copy;Base7
          </Typography>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;