import React, { Component } from 'react';
import Header from './LandingComponents/Header';
import Content from './LandingComponents/Content';
import Footer from './LandingComponents/Footer';

// import Header from '../../components/Header/Header';
// import Content from './Content';
// import Footer from '../../components/Footer/Footer';

class Landing extends Component {
  render() {
    return (
      <div className='main-container'>
        <h1>Hello</h1>
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default Landing;
