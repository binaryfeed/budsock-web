import React from 'react'

import Card from 'react-md/lib/Cards/Card'
import CardText from 'react-md/lib/Cards/CardText'
import FontIcon from 'react-md/lib/FontIcons'
import List from 'react-md/lib/Lists/List'
import ListItem from 'react-md/lib/Lists/ListItem'
import Media from 'react-md/lib/Media'

export default () => {
  const checkIcon = <FontIcon>done</FontIcon>
  return (
    <Card className='md-cell md-cell--4'>
      <Media>
        <img src='/static/budsock-loop.jpg' role='presentation' />
      </Media>
      <CardText>
        Tired of wasting time untangling your earbud wires? Get yourself a budsock and never look back!
      </CardText>
      <List className='md-cell md-cell--12'>
        <ListItem leftIcon={checkIcon} primaryText='keeps earbud wires from tangling' />
        <ListItem leftIcon={checkIcon} primaryText='lightweight and machine-washable' />
        <ListItem leftIcon={checkIcon} primaryText='made with eco-friendly materials' />
      </List>
    </Card>
  )
}
