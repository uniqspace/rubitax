import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Lato',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#E2308E',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

export default theme;