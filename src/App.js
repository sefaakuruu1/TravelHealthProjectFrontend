import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PageOne from './Pages/PageOne';
import PageTwo from './Pages/PageTwo';
import PageThree from './Pages/PageThree';
import PageFour from './Pages/PageFour';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={PageOne} />
        <Route path="/sms-dogrulama" component={PageTwo} />
        <Route path="/teklif" component={PageThree} />
        <Route path="/fiyat" component={PageFour} />
      </Switch>
    </BrowserRouter>
   
  );
}

export default App;
