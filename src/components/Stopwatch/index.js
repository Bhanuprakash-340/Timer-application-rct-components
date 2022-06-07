import {Component} from 'react'

import './index.css'

class Stopwatch extends Component {
  state = {isTimerRunning: false, timerElapsedInSec: 0}

  componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  onResetTimer = () => {
    clearInterval(this.timeInterval)
    this.setState({isTimerRunning: false, timerElapsedInSec: 0})
  }

  onTimerStop = () => {
    clearInterval(this.timeInterval)
    this.setState({isTimerRunning: false})
  }

  updateTime = () => {
    this.setState(prevState => ({
      timerElapsedInSec: prevState.timerElapsedInSec + 1,
    }))
  }

  onTimerStart = () => {
    this.timeInterval = setInterval(this.updateTime, 1000)
    this.setState({isTimerRunning: true})
  }

  renderSeconds = () => {
    const {timerElapsedInSec} = this.state

    const seconds = Math.floor(timerElapsedInSec % 60)

    if (seconds < 10) {
      return `0${seconds}`
    }
    return seconds
  }

  renderMinute = () => {
    const {timerElapsedInSec} = this.state

    const minutes = Math.floor(timerElapsedInSec / 60)

    if (minutes < 10) {
      return `0${minutes}`
    }
    return minutes
  }

  render() {
    const {isTimerRunning} = this.state
    const time = `${this.renderMinute()}:${this.renderSeconds()}`
    return (
      <div className="app-container">
        <h1 className="heading">Stopwatch</h1>
        <div className="timer-container">
          <div className="stop-watch-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
              className="stop-watch-icon"
            />
            <p className="description">Timer</p>
          </div>
          <h1 className="timer">{time}</h1>
          <div className="button-container">
            <button
              className="custom-button green"
              type="button"
              onClick={this.onTimerStart}
              disabled={isTimerRunning}
            >
              start
            </button>
            <button
              className="custom-button red"
              type="button"
              onClick={this.onTimerStop}
            >
              stop
            </button>
            <button
              className="custom-button yellow"
              type="button"
              onClick={this.onResetTimer}
            >
              reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
