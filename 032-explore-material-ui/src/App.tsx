import React from 'react';
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import './App.css';

function App() {
  return (
    <div className="App">
      <ButtonGroup orientation="vertical">
        <Button onClick={() => console.log('ielllo')}>Sup</Button>
        <Button variant="contained" color="primary">
          Hello
        </Button>
      </ButtonGroup>
      <Checkbox defaultChecked color="secondary" />
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            name="checkedH"
          />
        }
        label="Custom icon"
      />
    </div>
  );
}

export default App;
