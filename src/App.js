import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Switch, Route, Router } from 'react-router-dom';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'mobx-react';

import Header from './layout/Header';
import Container from './layout/Container';
import ScrollTop from './components/ScrollTop';
import theme from './theme';
import RootStore from './stores/RootStore';
import Api from './api';
import Home from './views/Home';
import CreateBook from './views/CreateBook';
import UpdateBook from './views/UpdateBook';
import BookDetails from './views/BookDetails';
import UserDetails from './views/UserDetails';
import Notifications from './components/ui/Notifications';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);
const api = new Api(window.fetch.bind(window));
const rootStore = new RootStore(api);

const App = () =>
  <Provider rootStore={rootStore} routing={routingStore}>
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline/>
          <Header/>
          <Container>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/books/create" component={CreateBook}/>
              <Route path="/books/:id/update" component={UpdateBook}/>
              <Route path="/books/:id" component={BookDetails}/>
              <Route path="/users/:id" component={UserDetails}/>
            </Switch>
          </Container>
          <Notifications />
          <ScrollTop/>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </Router>
  </Provider>;

export default App;
