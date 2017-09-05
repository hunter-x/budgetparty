import React from 'react'
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl'
import { constants } from '../config/constants'
import Translate    from 'react-translate-component';
const _t = Translate.translate;
import counterpart  from 'counterpart';

const getSign = (number) => {
  let sign = ''

  if (number.percentChange > 0) {
    sign = '+'
  } else if (number.percentChange < 0) {
    sign = '-'
  }

  return sign
}

let PartyLevelHeader = (props) => {
  let { service, services, department, departments } = props;
    let arr=[]
  if (departments instanceof Array ) {
    departments.map((department,index)=>{
      if ((department.lan)===(counterpart.getLocale())) {
        arr.push(department)
      }
    });
  }else{
    var departmentsArray = Object.keys(departments).map( (key)=> { return departments[key]; });
    departmentsArray.map((department,index)=>{
      if ((department.lan)===(counterpart.getLocale())) {
        arr.push(department)
      }
    });
  }
  departments=arr;
  
  let inter=[]
  if (services instanceof Array ) {
    services.map((department,index)=>{
      if ((department.lan)===(counterpart.getLocale())) {
        inter.push(department)
      }
    });
  }else{
    var servicesArray = Object.keys(services).map( (key)=> { return services[key]; });
    servicesArray.map((department,index)=>{
      if ((department.lan)===(counterpart.getLocale())) {
        inter.push(department)
      }
    });
  }
  services=inter;
  const isServiceComplete = department ? false : service.status === 'complete'
  const isUnstarted = department && department.amount === null
  const isInProgress = department && department.amount !== null
  const imgCssClass = isServiceComplete ? 'PartyLevelHeader__image--complete' : 'PartyLevelHeader__image'

  const handleReset = (deptId, departments, service, services) => {
    props.resetBudgetAmount(deptId, departments, service, services);
  };

    const renderFinishedOverlay = (serv) => {
    const sign = getSign(serv)
    console.log(service);
    return (
      <div className="PartyLevelHeader__overlay--green">
        <span className="PartyLevelHeader__status">
          {_t('department.did')}
        </span>
        <h2 className="PartyLevelHeader__value">
          <FormattedNumber
            value={service.amount}
            minimumFractionDigits={0}
            maximumFractionDigits={0}
          />
        </h2>
        <span className="PartyLevelHeader__change">
          {sign} {Math.abs(service.percentChange)} {_t('department.percent')}
        </span>
      </div>
    )
  }

  const renderInProgressOverlay = (dept) => {
    const sign = getSign(dept)

    return (
      <div className="PartyLevelHeader__overlay--grey">
        <span className="PartyLevelHeader__change">
          {sign} {Math.abs(dept.percentChange)}{_t('department.percent')}
        </span>
        <h2 className="PartyLevelHeader__value">
          <FormattedNumber
            value={dept.amount}
            minimumFractionDigits={0}
            maximumFractionDigits={0}
          />
        </h2>
        <span className="PartyLevelHeader__reset" onClick={handleReset.bind(this, dept.deptId, departments, service, services)}>
          {_t('department.reset')}
        </span>
      </div>
    )
  }

  const renderStartingOverlay = (dept) => {
    return (
      <div className="PartyLevelHeader__overlay--grey">
        <span className="PartyLevelHeader__change">
          {_t('department.departementSpending')} {constants.LAST_YEAR}
        </span>
        <h2 className="PartyLevelHeader__value">
          <FormattedNumber
            value={dept.lastYearAmount}
            minimumFractionDigits={0}
            maximumFractionDigits={0}
          />
        </h2>
      </div>
    )
  }

  return (
    <div className="PartyLevelHeader">
      { isServiceComplete && renderFinishedOverlay(service, department) }
      { isInProgress && renderInProgressOverlay(department) }
      { isUnstarted && renderStartingOverlay(department) }
      <img
        src={`/images/${service.image.split('.')[0]}_full.svg`}
        alt={service.title}
        className={imgCssClass}
      />
    </div>
  )
}

export default PartyLevelHeader

PartyLevelHeader.propTypes = {
  service: PropTypes.shape({
    completeSections: PropTypes.number,
    departments: PropTypes.arrayOf(
      PropTypes.number,
    ),
    desc: PropTypes.string,
    image: PropTypes.string,
    index: PropTypes.number,
    percentChange: PropTypes.number,
    status: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
  department: PropTypes.shape({
    amount: PropTypes.number,
    amount2015: PropTypes.number,
    deptId: PropTypes.number,
    description: PropTypes.string,
    explainYourSpending: PropTypes.string,
    lastYearAmount: PropTypes.number,
    learnMore: PropTypes.string,
    name: PropTypes.string,
    percentChange: PropTypes.number,
    url: PropTypes.string,
  }),
  resetBudgetAmount: PropTypes.func,
};
