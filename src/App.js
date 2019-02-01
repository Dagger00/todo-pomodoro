import React, { Component } from 'react';
import {TimerPage} from './TimerPage/TimerPage';
import styled from 'styled-components';

const AppWrapper = styled.div`
  width: 100%;
`;

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <TimerPage />
      </AppWrapper>
    );
  }
}

export default App;
