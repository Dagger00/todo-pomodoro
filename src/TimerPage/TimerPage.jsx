import React, {Component} from 'react';
import styled from 'styled-components';
import {MagicButton} from '../MagicButton/MagicButton';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.work ? 'red' : '#00b0ff'};
  font-size: 32px;
`;

const StyledTitle = styled.span`
  margin-top: 30vh;
`;

const ButtonWrapper = styled.div`
  height: 40px;
`;

export class TimerPage extends Component {
  state = {
    standardTime: 120,
    work: true,
    started: false,
    title: 'Let\'s work HARD!',
    intervalID: 0,
  };

  componentDidMount = () => {
    const {standardTime} = this.state;

    this.setState(() => ({
      timeToShow: this.showTime(standardTime),
      time: standardTime,
    }))
  };

  startTimer = () => {
    const intervalID = setTimeout(this.timerTick, 1000);

    this.setState(() => ({
      started: true,
      intervalID
    }));
  };

  timerTick = () => {
    const {time, standardTime, work} = this.state;

    if (time > 0) {
      this.setState(() => ({
        time: time - 1,
        timeToShow: this.showTime(time - 1),
      }));
      setTimeout(this.timerTick, 1000)
    } else {
      const newState = !work;

      this.setState(() => ({
        time: standardTime,
        timeToShow: this.showTime(standardTime),
        started: false,
        work: newState,
        title: newState ? 'Let\'s work HARD!' : 'Relax..'
      }));
    }
  };

  showTime = (time) => {
    if (time%60 === 0) {
      if (time === 60) {
        return `01 : 00`;
      }
      return `${time / 60} : 00`;
    }
    if (time > 60) {
      if (time > 600) {
        if (time % 60 > 9) {
          return `${Math.floor(time / 60)} : ${time % 60}`;
        } else {
          return `${Math.floor(time / 60)} : 0${time % 60}`;
        }
      } else {
        if (time % 60 > 9) {
          return `0${Math.floor(time / 60)} : ${time % 60}`;
        } else {
          return `0${Math.floor(time / 60)} : 0${time % 60}`;
        }
      }
    } else {
      if (time > 9) {
        return `00 : ${time}`;
      } else {
        return `00 : 0${time}`;
      }
    }
  };

  componentWillUnmount = () => {
    const {intervalID} = this.state;

    clearInterval(intervalID);
  };

  render() {
    const {timeToShow, started, work, title} = this.state;

    return (
      <Wrapper work={work}>
        <StyledTitle>{title}</StyledTitle>
        <h2>{timeToShow}</h2>
        {
          started ?
            null
            :
            <ButtonWrapper><MagicButton onClick={this.startTimer}>Start</MagicButton></ButtonWrapper>
        }
      </Wrapper>
    );
  }
}
