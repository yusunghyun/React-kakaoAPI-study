import React from 'react';
import {NavLink,Switch,Route} from 'react-router-dom'
import ImageSearch from './pages/ImageSearch'

const App = () => {

  const myStyle = {
    fontWeight: 'bold',
    color: '#b82514',
    textDecoration: 'none'
  };

  return (
    <div>
      <Switch>
        <Route path='/:query?' component={ImageSearch} />
      </Switch>
    </div>
  );
}

export default App;
