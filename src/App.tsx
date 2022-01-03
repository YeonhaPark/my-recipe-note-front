import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { apiProvider } from './api/providers';
import { User } from './api/types';
import { Login, Main, Signup } from './components/pages';
import 'normalize.css';
import theme from './theme';

function App() {
  const [user, setUser] = useState<User>();

  const getUser = async () => {
    const res: User = await apiProvider.getCurrentUser();
    setUser(res);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
