import Head from 'next/head'

import React from 'react'

import Button from 'react-md/lib/Buttons/Button'

import Animation from '../components/animation'
import Description from '../components/description'

export default () => {
  return (
    <div className='md-grid'>
      <div className='md-cell md-cell--12'>
        <Head>
          <meta charset='utf-8' />
          <meta name='viewport' content='width=device-width,initial-scale=1' />
          <title>budsock -- tangle-free earbuds, earpods and other in-ear headphone cords and wires</title>
          <link rel='icon' href='/static/favicon.ico' />
          <link rel='stylesheet' href='/static/react-md.grey-deep_orange.min.css' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Material+Icons' />
          <meta name='description' content='tangle-free earbuds' />
          <meta name='author' content='budsock' />
          <meta name='viewport' content='width=device-width,initial-scale=1' />
          <meta property='og:title' content='budsock' />
          <meta property='og:type' content='product' />
          <meta property='og:url' content='https://www.budsock.com/' />
          <meta property='og:image' content='https://www.budsock.com/static/logo-chrome.png' />
          <meta property='og:site_name' content='budsock' />
          <meta property='fb:admins' content='500013379,774849792' />
          <meta property='og:description' content='Tangle-free earbuds and headphone cords!' />
        </Head>

        <div className='md-grid'>
          <div className='md-cell md-cell--12 md-cell--middle'>
            <img
              alt='budsock logo'
              title='budsock'
              src='/static/logo-chrome.png'
            />
            <Button
              style={{marginLeft: '20px', marginBottom: '40px'}}
              raised
              secondary
              label='Buy on Amazon'
              href='https://www.amazon.com/budsock-White-with-Orange-Logo/dp/B00X83MTAK/ref=as_sl_pc_qf_sp_asin_til?tag=budsock-20&linkCode=w00&linkId=FU365RPNE74ISUPM&creativeASIN=B00X83MTAK'>
              add_shopping_cart
            </Button>
            <style jsx>{`
              img {
                width: 100px;
                height: 100px;
              }
          `}</style>
          </div>
        </div>

        <div className='md-grid body'>
          <Animation/>
          <Description/>
        </div>
      </div>
    </div>
  )
}
