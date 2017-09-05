import React from 'react'
import PropTypes from 'prop-types';
import counterpart  from 'counterpart';

let ChangeByPercentButtons = (props) => {
  let { deptId, departments, services } = props
  //Load Departements of the Specified Language only
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
  const serviceIndex = props.match.params.service_id

  const handlePercentChange = (deptId, percentChange, departments, serviceIndex, services) => {
    props.onPercentChange(departments[deptId - 1], percentChange, departments, serviceIndex, services)
  }

  return (
    <div className="ChangeByPercentButtons__adjustButtons">
      <div
        className="ChangeByPercentButtons__oneMillionRed"
        onClick={handlePercentChange.bind(this, deptId, -1, departments, serviceIndex, services)}
      >
        <p>-1%</p>
      </div>
      <div
        className="ChangeByPercentButtons__hundredThousandRed"
        onClick={handlePercentChange.bind(this, deptId, -.1, departments, serviceIndex, services)}
      >
        <p>-0.1%</p>
      </div>
      <div
        className="ChangeByPercentButtons__hundredThousandGreen"
        onClick={handlePercentChange.bind(this, deptId, .1, departments, serviceIndex, services)}
      >
        <p>+0.1%</p>
      </div>
      <div
        className="ChangeByPercentButtons__oneMillionGreen"
        onClick={handlePercentChange.bind(this, deptId, 1, departments, serviceIndex, services)}
      >
        <p>+1%</p>
      </div>
    </div>
  )
}

export default ChangeByPercentButtons;

ChangeByPercentButtons.propTypes = {
  deptId: PropTypes.string.isRequired,
  departments: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string,
      service_id: PropTypes.string,
    }),
  }).isRequired,
  onPercentChange: PropTypes.func.isRequired,
};