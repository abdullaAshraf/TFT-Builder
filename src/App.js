import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import TFTBuilder from './containers/TFTBuilder/TFTBuilder'
import Builds from './containers/Builds/Builds'
import Axios from 'axios';
import { Route, Switch } from 'react-router-dom'

Axios.defaults.baseURL = 'https://tft.abdullaashraf.now.sh/'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/builds" component={Builds} />
            <Route path="/" component={TFTBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
