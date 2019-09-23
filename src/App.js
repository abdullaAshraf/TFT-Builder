import React from 'react';
import Layout from './hoc/Layout/Layout'
import TFTBuilder from './containers/TFTBuilder/TFTBuilder'
import Axios from 'axios';

Axios.defaults.baseURL = 'https://tft.abdullaashraf.now.sh/'

function App() {
  return (
    <div>
      <Layout>
        <TFTBuilder />
      </Layout>
    </div>
  );
}

export default App;
