import React from 'react';
import { theme, ThemeProvider } from '@chakra-ui/core';

import './App.css';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <LoginForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
