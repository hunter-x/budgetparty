import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Navigation from './Navigation'
import PartyLevel from './PartyLevel'
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
const _t = Translate.translate;
export default class Dashboard extends Component {
  render () {
    let { services, funds, user } = this.props;
    //console.log(counterpart.getLocale());
    //Load service adequate to language of the App--I tried to use splice but I had a bug in french version
    let arr=[]
    services.map((service,index)=>{
      if ((service.lan)===(counterpart.getLocale())) {
        arr.push(service)
      }
    });
    services=arr;
    const getServiceLink = (service) => {
      // The Welcome Level should go back to the Intro pages...
      if (service.index === 0) return '/intro/1';
      // The Budget Submission will also have a special link...
      else if (service.index + 1 >= services.length) return '/submit';
      // Otherwise, continue at will for the other service buckets.
      else return `/service/${service.index}`;
    };

    const isLinkClickAllowed = (service) => {
      return service.status && service.status !== "locked";
    }

    return (
      <div>
        <Navigation showUser showTotalFunds funds={funds} user={user} />

        <div className="Dashboard__body">
          {services.map(service => {
            return isLinkClickAllowed(service)
              ?
                <Link to={getServiceLink(service)} key={service.index}>
                  <PartyLevel {...service} />
                </Link>
              :
                <PartyLevel {...service} key={service.index} />
          })}
        </div>

      </div>
    )
  }
}

Dashboard.propTypes = {
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
  funds: PropTypes.shape({
    generalFund: PropTypes.number,
    servicesSum: PropTypes.number,
    generalFund2016: PropTypes.number,
  }).isRequired,
  user: PropTypes.object,
};