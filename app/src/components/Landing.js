import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import IconVoice from '../images/landing/voice-icon.svg';
import Confetti from '../images/landing/confetti.svg';
import HomepageScreen from '../images/landing/homepage-screens.svg';
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
const _t = Translate.translate;
counterpart.registerTranslations('en',require('../../locales/en'));
counterpart.registerTranslations('fr',require('../../locales/fr'));
counterpart.registerTranslations('ar',require('../../locales/ar'));

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { contributors: [] };
  }

  componentWillMount() {
    fetch(this.props.contributorsURL)
      .then(response => response.json())
      .then(contributors => this.setState({ contributors }));
      counterpart.setLocale("fr")
  }
  handleTranslation(e){
    console.log(e);
      counterpart.setLocale(e.target.getAttribute('data-tag'))
  }
  render() {
    return <div id="landing">
      <section className="section">
        <div>
          <button onClick={this.handleTranslation} title="arabic" className="flag-icon flag-icon-tn" data-tag='ar' style={{cursor:"pointer",fontSize:"24px"}}></button> 
          <button onClick={this.handleTranslation} title="french" className="flag-icon flag-icon-fr" data-tag='fr' style={{cursor:"pointer",fontSize:"24px",marginLeft:"1vh"}}></button> 
          <button onClick={this.handleTranslation} title="english" className="flag-icon flag-icon-us" data-tag='en' style={{cursor:"pointer",fontSize:"24px",marginLeft:"1vh"}}></button> 
        </div>

        <h1>{_t('home.title')}</h1>
        <h3>{_t('home.subtitle')}</h3>
        <p>
          <Link to="/login" className="btn btn-cta">{_t('home.start')}</Link>
        </p>
        <div className="screens-container">
          <img className="bg-confetti" alt="Screen confetti" src={Confetti}/>
          <img className="icon-screens" alt="Application Preview" src={HomepageScreen}/>
        </div>
        <h1>{_t('home.voice')}</h1>
        <h3>{_t('home.mystical')}</h3>
        <img alt="Voice" className="icon-voice" src={IconVoice}/>
        <p>Commuting, construction, parks, public safety—every day you are impacted by city budget decisions.</p>
      </section>
      <section className="section section-secondary">
        <h1 className="header-light">{_t('home.test')}</h1>
        <p>
          <Link to="/login" className="btn btn-secondary btn-cta">{_t('home.start')}</Link>
        </p>
      </section>
     
    </div>;
  }
}

Landing.defaultProps = {
  contributorsURL: 'https://api.github.com/repos/open-austin/budgetparty/contributors'
};
