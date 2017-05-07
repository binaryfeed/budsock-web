import fetch from 'isomorphic-fetch'

import React, {Component} from 'react'

import Card from 'react-md/lib/Cards/Card'
import CircularProgress from 'react-md/lib/Progress/CircularProgress'
import Media from 'react-md/lib/Media'

import animationPlayer from '../lib/animation/player'

export default class Animation extends Component {
  constructor() {
    super()
    this.state = {animationLoaded: false}
  }

  componentDidMount() {
    const component = this
    fetch('https://raw.githubusercontent.com/jeffreywescott/budsock-web/master/static/budsock-animation-frames.json')
      .then(res => res.json())
      .then(animationFrames => {
        const container = document.getElementById('animation')
        animationPlayer.init(container, animationFrames)
        animationPlayer.start()
        component.setState({animationLoaded: true})
      })
  }

  render() {
    const spinner = this.state.animationLoaded ?
      null :
      <CircularProgress id='loading' key='progress' style={{width: '100px'}} />
    return (
      <Card className='md-cell md-cell--8'>
        <div className='animation'>
          <Media>
            <div id='animation'>{spinner}</div>
            <div className='hide-sound-control'/>
          </Media>
        </div>
        <style jsx>{`
          .hide-sound-control {
            position: absolute;
            top: 0;
            right: 0;
            width: 20%;
            height: 10%;
            background-color: white;
            z-index: 10;
          }
      `}</style>
      </Card>
    )
  }
}
