import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
const _t = Translate.translate;

import Navigation from './Navigation'
import PartyLevelHeader from './PartyLevelHeader'
import DepartmentChangeByPercentButtons from './Department/ChangeByPercentButtons'
import ProgressBar from './ProgressBar'

import comment from '../images/comment.svg'
import backArrow from '../images/back_arrow.svg'
import forwardArrow from '../images/forward_arrow.svg'

const Department = (props) => {
  let { services, departments, funds, user } = props;
  const { service_id, id } = props.match.params;
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
    services.map((service,index)=>{
      if ((service.lan)===(counterpart.getLocale())) {
        inter.push(service)
      }
    });
  }else{
    var servicesArray = Object.keys(services).map( (key)=> { return services[key]; });
    servicesArray.map((service,index)=>{
      if ((service.lan)===(counterpart.getLocale())) {
        inter.push(service)
      }
    });
  }
  services=inter;
  //console.log("depComp",departments);
  //console.log("servDepComp",services);
  const service = services[Number(service_id)];
  const department = departments[Number(id) - 1];
  const departmentIndex = service.departments.indexOf(Number(id)) + 1
  const serviceDepartments = service.departments
  const nextLink = departmentIndex < serviceDepartments.length
    ? `/service/${service.index}/department/${Number(id) + 1}`
    : `/service/${service.index}`
  //console.log('service',service,'department',department,'departmentIndex',departmentIndex,'serviceDepartments',serviceDepartments,"nextLink",nextLink);
  const handleNextClick = (dept, service, serviceDepts, departments, services, userId, e) => {
    props.onClickNext(dept, service, serviceDepts, departments, services, userId)
  }

  return (
    <div>
      <Navigation service={department} funds={funds} showBack showTotalFunds showServiceFunds />

      <div className="Department">
        <PartyLevelHeader {...props}
          service={service}
          department={department}
        />

        <div className="Department__body">
          <h1 className="Department__title">{department.name}</h1>
          <p className="Department__desc">
            {department.description}
          </p>
          <Link to={`/service/${service_id}/department/${id}/learn-more`}
            className="Department__link"
          >
            {_t('department.more')}
          </Link>

          <DepartmentChangeByPercentButtons deptId={id} {...props} />

          <Link to={`/service/${service_id}/department/${id}/explain`}
            className="Department__link"
          >
            <img src={comment} alt="Comment bubble icon"/> {_t('department.explain')}
          </Link>

          <div className="Department__review-buttons">
            <Link to={departmentIndex > 1 ? `/service/${service.index}/department/${id - 1}` : `/service/${service.index}`}
              className="Department__edit-button">
              <div className="flexconatiner">
                <img src={backArrow} alt="Back Arrow" className="left" style={{padding: "6px 0 0 10px"}}/>
                <span className="right" style={{paddingRight: "20px"}}>{_t('department.prev')}</span>
              </div>

            </Link>
            <Link to={nextLink} onClick={handleNextClick.bind(this, department, service, service.departments, departments, services, user.uid)}
              className="Department__done-button">
              <span className="left" style={{paddingLeft: "20px"}}>{_t('department.next')}</span>
              <img src={forwardArrow} alt="Back Arrow" className="right" style={{padding: "6px 10px 0 0"}} />
            </Link>
          </div>

          <ProgressBar x={departmentIndex} y={serviceDepartments.length} />
        </div>

      </div>
    </div>
  )
}

export default Department

Department.propTypes = {
  departments: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
  funds: PropTypes.shape({
    generalFund: PropTypes.number,
    servicesSum: PropTypes.number,
    generalFund2016: PropTypes.number,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string,
      service_id: PropTypes.string,
    }),
  }).isRequired,
  onClickNext: PropTypes.func.isRequired,
};
