import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles, colors } from '@mui/material';
import { DemoForm } from './components/DemoForm';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: colors.cyan[500] },
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          'html, body, #root': {
            width: '100%',
            height: '100%',
          },
          '#root': {
            display: 'grid',
            alignItems: 'start',
            justifyItems: 'center',
            padding: '24px 0',
            rowGap: '24px',
          },
        }}
      />
      <DemoForm />
    </ThemeProvider>
  );
}
