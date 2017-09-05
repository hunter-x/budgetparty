import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import introImg0 from '../images/intro-images/0.svg';
import introImg1 from '../images/intro-images/1.svg';
import introImg3 from '../images/intro-images/3.svg';
import introImg4 from '../images/intro-images/4.svg';
import introConfetti0 from '../images/intro-confetti/0.svg';
import introConfetti1 from '../images/intro-confetti/1.svg';
import introConfetti3 from '../images/intro-confetti/3.svg';
import introConfetti4 from '../images/intro-confetti/4.svg';
import TreeMapViz from './TreeMapViz' ;
import Translate    from 'react-translate-component';
const _t = Translate.translate;

//we're not using this no more we call this string from Locale
const introText = [
  "As a council member you have $969.2 Million to fund services for all of Austin, Texas",
  "This money comes from the General Fund for 2016-17",
  "This money helps Austin run programs and employs 13,838 civil servants",
  "It's now up to you to make sure we allocate the funds and create a fair budget."
]

const introImages = [
  { src: introImg0, alt: 'open hand with coins', confetti: introConfetti0 },
  { src: introImg1, alt: 'money bag', confetti: introConfetti1 },
  { src: introImg3, alt: 'bar graph trending up', confetti: introConfetti3 },
  { src: introImg4, alt: 'two children smiling', confetti: introConfetti4 },
]

const IntroPage = (props) => {
  const nextId = Number(props.params.id) + 1;
  const nextUrl = `/intro/${nextId}`;
  const isLastIntro = introText.length === Number(props.params.id);
  const launchViz = Number(props.params.id) === 3
  const imageIndex = props.params.id - 1
  const image = introImages[imageIndex]

  return (
    <div>
    {launchViz?<TreeMapViz nextUrl={nextUrl} />: 
      <div className="intro">
        <Link to="/dashboard" className="intro__skip">{_t('intro.skip')}</Link>
        <div className="intro__image-wrapper">
          <img src={image.confetti} className="intro__confetti" alt="Confetti" />
          <img src={image.src} className={`intro__img-${imageIndex}`} alt={image.alt} />
        </div>
        <p className="intro__text">{props.text}</p>
        <div className="intro__button-flex-container">
          {
            isLastIntro
            ? <Link to="/dashboard" className="intro__start-button"><span>{_t('intro.start')}</span></Link>
            : <Link to={nextUrl} className="intro__next-button">{_t('intro.next')}</Link>
          }
        </div>
      </div>
    }
    </div>     
  )
}

export default class Intro extends Component {
  render() {
    return (
      <Route path="/intro/:id" render={({ match }) => <IntroPage {...match} text={_t('intro.t'+(match.params.id - 1))} />} />
    )
  }
}

IntroPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  text: PropTypes.string.isRequired,
};
