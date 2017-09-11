import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';

import Navigation from '../Navigation'
import IntroPage from './IntroPage'
import ReviewPage from './ReviewPage'
import SavePage from './SavePage'
import counterpart  from 'counterpart';

class Submit extends Component {
  render() {
    let { funds, services } = this.props;
    //load adequate language services
    let arr=[];
    services.map((service,index)=>{
      if ((service.lan)===(counterpart.getLocale())) {
        arr.push(service)
      }
    });
    services=arr;
    return (
      <div>
        <Navigation funds={funds} showBack showTotalFunds />

        <div className="Submit">
          <Switch>
            <Route path="/submit" className="intro" exact
              render={() => <IntroPage funds={funds} />}
            />
            <Route path="/submit/review" exact
              render={() => <ReviewPage services={services} />}
            />
            <Route path="/submit/save" exact
              render={() => <SavePage {...this.props} />}
            />
          </Switch>
        </div>

      </div>
    )
  }

}

export default Submit

Submit.propTypes = {
  funds: PropTypes.shape({
    sumOfServiceSpending: PropTypes.number.isRequired,
    servicesSumPercentChange: PropTypes.number.isRequired,
  }).isRequired,
  services: PropTypes.arrayOf(
    PropTypes.object,
  ),
}
