import Link from '../LinkComponent/Link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';

import useStyles from './layout.style';
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  IconButton,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
  Container,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import { routes } from '../../utils/constants/routes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutUser } from '../../features/auth';

function ElevationScroll(props: any) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = (props: any) => {
  const dispatch = useAppDispatch();

  const classes = useStyles();
  const theme = useTheme();
  const { data: session, status } = useSession();

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const [openDrawer, setOpenDrawer] = useState(false);

  const router = useRouter();

  const path = routes;
  const onSignOut = () => {
    signOut().then(() => {
      dispatch(logoutUser());
    });
  };

  const tabs = (
    <>
      <Grid container justifyContent='flex-end' spacing={4} className='font-xs'>
        {path.map(({ name, link }) => (
          <Grid item key={link}>
            <Link href={link} {...props}>
              <Typography className={classes.link}>{name}</Typography>
            </Link>
          </Grid>
        ))}
        {!session && (
          <Grid item>
            <button onClick={() => signIn()}>Sign In</button>
          </Grid>
        )}
        {session && (
          <Grid item>
            <p>Signed in as {session.user.email}</p>
            <button onClick={onSignOut}>Sign Out</button>
          </Grid>
        )}
      </Grid>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
        anchor='right'
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {path.map(({ name, link }) => (
            <ListItem
              key={link}
              divider
              button
              onClick={() => {
                setOpenDrawer(false);
              }}
            >
              <ListItemText disableTypography>
                <Link href={link} {...props}>
                  <Typography
                  // style={{
                  //   color:
                  //     router.pathname === link
                  //       ? "primary"
                  //       : "rgb(107 107 107)",
                  //   fontWeight: router.pathname === link && "bold",
                  // }}
                  >
                    {name}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );
  return (
    <>
      <ElevationScroll>
        <AppBar>
          <Container maxWidth='lg' sx={{ py: '10px' }}>
            <Toolbar disableGutters>
              <Link href='/' {...props}>
                <Typography className={classes.logo + ' text-white'}>
                  Base7 TM
                </Typography>
              </Link>
              {matches ? drawer : tabs}
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
    </>
  );
};
export default Header;
