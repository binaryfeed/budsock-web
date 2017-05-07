import React, {Component} from 'react'

import Card from 'react-md/lib/Cards/Card'
import CardText from 'react-md/lib/Cards/CardText'
import FontIcon from 'react-md/lib/FontIcons'
import List from 'react-md/lib/Lists/List'
import ListItem from 'react-md/lib/Lists/ListItem'
import Media from 'react-md/lib/Media'

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

export default class Description extends Component {
  constructor() {
    super()
    this.state = {productImageIndex: 0}
  }

  componentDidMount() {
    const component = this
    setInterval(() => {
      const productImageIndex = (component.state.productImageIndex + 1) % 3
      component.setState({productImageIndex})
    }, 5000)
  }

  renderProductImage() {
    const productImages = [
      '/static/budsock-loop.jpg',
      '/static/budsock-only.jpg',
      '/static/budsock-open.jpg',
    ]
    const image = (
      <img
        src={productImages[this.state.productImageIndex]}
        key={productImages[this.state.productImageIndex]}
        role='presentation'
      />
    )

    return (
      <CSSTransitionGroup
        transitionName='image'
        transitionEnterTimeout={1500}
        transitionLeaveTimeout={1500}
      >
        {image}
      </CSSTransitionGroup>
    )
  }

  render() {
    const checkIcon = <FontIcon>done</FontIcon>
    return (
      <Card className='md-cell md-cell--4 md-cell--8-tablet '>
        <Media>
          {this.renderProductImage()}
          <style jsx global>{`
            .image-enter {
              opacity: 0.01;
            }

            .image-enter.image-enter-active {
              opacity: 1;
              transition: opacity 1500ms ease-in;
            }

            .image-leave {
              opacity: 1;
            }

            .image-leave.image-leave-active {
              opacity: 0.01;
              transition: opacity 1500ms ease-in;
            }
        `}</style>
        </Media>
        <CardText>
          How many frustrating minutes per day do you spend untangling your earbuds?
        </CardText>
        <CardText>
          The budsock was designed specifically to keep your earbud wires from tangling. It is lightweight and machine-washable, and made with eco-friendly materials. Get yours today!
        </CardText>
      </Card>
    )
  }
}
