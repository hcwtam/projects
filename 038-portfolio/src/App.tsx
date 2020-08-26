import React from 'react';

import Landing from './components/Landing/Landing';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Navbar from './components/Navbar/Navbar';

import pic1 from './assets/3.png';
import pic2 from './assets/2.png';
import pic3 from './assets/4.png';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Landing />
      <About />
      <Projects />
      <Contact />
      {/* <div
        style={{
          height: '200vh',
          width: '100vw',
          textAlign: 'center',
          background: '#FEF7DB'
        }}
      >
        <img
          style={{
            margin: '100px 20px 0',
            width: 400,
            boxShadow: ' 0 0 10px #DDDDDD',
            borderRadius: 5
          }}
          src={pic3}
          alt="asd"
        />
        <img
          style={{
            margin: '100px 20px 0',
            width: 400,
            boxShadow: ' 0 0 10px #DDDDDD',
            borderRadius: 5
          }}
          src={pic2}
          alt="asd"
        />
        <img
          style={{
            marginTop: 40,
            width: 840,
            boxShadow: ' 0 0 10px #DDDDDD',
            borderRadius: 5
          }}
          src={pic1}
          alt="asd"
        />
      </div> */}
    </div>
  );
}

export default App;
