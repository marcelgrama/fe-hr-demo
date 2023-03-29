import { SocialDistance } from '@mui/icons-material';
import { createTheme, ThemeOptions } from '@mui/material';
import { red, grey } from '@mui/material/colors';
import "typeface-poppins";

declare module '@mui/material' {
  interface Color {
    dark: string;
    main: string;
    light: string;
    white: string;
    black: string;
    black800: string;
    gray: string;
    gray800: string;
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    grey: {
      dark: '#777',
      main: '#888',
      light: '#999',
    },
    primary: {
      main: '#000',
      black: '#000',
      black800: '#222222',
      white: '#fff',
      gray: '#F8F8F8',
      gray800: '#D9D9D9'
    },
    secondary: {
      main: grey[900],
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiChip: {
      styleOverrides: {
        colorSecondary: {
          backgroundColor: '#333333',
        },
        colorPrimary: {
          backgroundColor: '#D9D9D9',
          color: '#000'
        },
      },

    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#000000"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: ({ ownerState }) => ({
          // Some CSS
          fontSize: '14px',
          borderRadius: '100px',
          minHeight: 34,
          textTransform: 'initial',
          minWidth: 165,
          boxShadow: '0 0 0 0px #fff',
          fontWeight: '600',
          padding: '0 30px',
          ...(ownerState.color === 'primary' && {
            backgroundColor: '#fff',
            color: '#000',
            borderColor: 'fff',
            '&:hover': {
              backgroundColor: '#fff',
              boxShadow: '0 0 0 3px #fff'
            }
          }),
          ...(ownerState.color === 'secondary' && {
            backgroundColor: '#000',
            color: '#fff',
            borderColor: '000',
            '&:hover': {
              backgroundColor: '#000',
              boxShadow: '0 0 0 3px #000'
            }
          }),
          "&.ternary": {
            backgroundColor: '#D9D9D9',
            color: '#000',
            '&:hover': {
              boxShadow: '0 0 0 3px #D9D9D9'
            }
          },
          "&.small": {
            minWidth: "64px"
          },
          "&.default": {
            minWidth: 'auto',
            padding: 10
          }
        }),
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        "&.primary": {
          backgroundColor: '#000',
          color: '#fff',
          fontWeight: '700',
          marginLeft: '50px',
          "&:first-child": {
            marginLeft: 0
          },
          '@media (max-width: 600px)': {
            marginLeft: 0
          },
          "&.Mui-selected": {
            backgroundColor: '#000',
            color: '#fff',
          }
        },
        "&.secondary": {
          backgroundColor: '#fff',
          color: '#000',
          textTransform: 'initial',
          fontSize: 20,
          fontWeight: '600',
          transition: '0.15s',
          "&:first-child": {
            marginLeft: 0
          },
          "&:hover": {
            boxShadow: 'inset 0px -4px 0px 0px #e8e8e8'
          },
          '@media (max-width: 600px)': {
            marginLeft: 0
          },
          "&.Mui-selected": {
            backgroundColor: '#fff',
            color: '#000',
          }
        }
      }
    }
  },
  MuiTabs: {
    styleOverrides: {
      scrollButtons: {
        color: '#fff',
        "&.Mui-disabled": {
          opacity: 0.2,
        },
      }
    }

  },
  MuiButtonBase: {
    // The properties to apply
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        overflowX: 'initial !important',

      },
      body: {
        overflowX: 'initial !important',
        overflow: 'overlay'
      }
    }
  }
}
};

const theme = createTheme(themeOptions);

export default theme;
