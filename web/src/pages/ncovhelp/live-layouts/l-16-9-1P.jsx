// title: 16:9 单人，直播

import React from 'react'
import css from './live.scss'
import classNames from 'classnames/bind'

import ShowStore from '../../../api-ncovhelp/ShowStore'
import LayoutArea from '../../../components/ncovhelp/LayoutArea'
import { Logo, AFDLogo } from '../../../components/ncovhelp/Logo'
import TextRoll from '../../../components/ncovhelp/TextRoll'
import AFD from '../../../components/ncovhelp/AFD'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      store: null,
      show: { }
    }
  }

  render () {
    let { show } = this.state
    let className = classNames.bind(css)({
      live: true,
      'l-16-9': true
    })

    return <div className={ className }>
      <LayoutArea className={ css.BackGround } d={{ l: 0, t: 0, w: 1920, h: 1080 }} />
      <LayoutArea className={ css.Video } d={{ l: 320, t: 0, w: 1600, h: 900 }} tip={ true } />
      <LayoutArea d={{ l: 320, t: 990, w: 1600, h: 90 }}>
        <TextRoll />
      </LayoutArea>
      <LayoutArea d={{ l: 0, t: 0, w: 320, h: 270 }}>
        <Logo />
      </LayoutArea>
      <LayoutArea d={{ l: 0, t: 270, w: 320, h: 270 }}>
        <AFDLogo />
      </LayoutArea>
      <LayoutArea d={{ l: 0, t: 540, w: 320, h: 540 }}>
        <AFD />
      </LayoutArea>

      <LayoutArea d={{ l: 320, t: 900, w: 400, h: 90 }}>
        <div className={ css.Runner }>{ show.runnerString }</div>
      </LayoutArea>
      <LayoutArea d={{ l: 720, t: 900, w: 400, h: 90 }}>
        <div className={ css.Game }>{ show.name }</div>
      </LayoutArea>
      <LayoutArea d={{ l: 1120, t: 900, w: 400, h: 90 }}>
        <div className={ css.Category }>{ show.category }</div>
      </LayoutArea>
      <LayoutArea d={{ l: 1520, t: 900, w: 400, h: 90 }}>
        <div className={ css.Timer }></div>
      </LayoutArea>
    </div>

    // return <div className={ className }>
    //   <div className={ css.BackGround }></div>
    //   <div className={ css.Video }>视频区域 1600 × 900，OBS 中不要露出黄线</div>
    //   <Area className={ css.TextRoll }>滚动文字区域 1600 × 90</Area>

    //   <Area className={ css.Logo }>活动 Logo 320 × 270</Area>
    //   <Area className={ css.Reward }>募捐公示 320 × 540</Area>
    //   <Area className={ css.Support }>支持者 320 × 270</Area>

    //   <div className={ css.Runner }>{ show.runnerString }</div>
    //   <div className={ css.Game }>{ show.name }</div>
    //   <div className={ css.Category }>{ show.category }</div>
    //   <Area className={ css.Timer }>计时器 400 × 90</Area>
    // </div>
  }

  async componentDidMount () {
    let store = new ShowStore()
    await store.load()

    let { id } = this.props.location.query
    let show = store.getShow(id)
    console.log(store, id, show)

    this.setState({ store, show })
  }
}