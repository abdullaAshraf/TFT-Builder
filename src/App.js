import React from 'react';
import Layout from './hoc/Layout/Layout'
import TFTBuilder from './containers/TFTBuilder/TFTBuilder'

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
