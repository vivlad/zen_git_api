import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import './index.css';
import App from './components/App/';
import Search from './components/Search';
import RepoDetail from './components/RepoDetail';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/search/" component={Search}/>
            <Route path="/repo_detail/" component={RepoDetail}/>
        </Switch>
    </BrowserRouter>,
 document.getElementById('root')
);
registerServiceWorker();
