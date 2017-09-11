import _ from 'underscore'
import InitialState from '../config/InitialState';
import counterpart from 'counterpart';

function services(state = InitialState.services, action = {}) {
  const { serviceIndex, status, departments } = action
  const newServiceState = state[serviceIndex];
  const newServiceStateEn = state[serviceIndex];
  const newServiceStateFr = state[serviceIndex+9]
  //console.log("bbb",action.serviceIndex);
  let newState = []
  let service, departmentIds, departmentAmounts

  switch (action.type) {
    case "UPDATE_SERVICE_STATUS":
      //newServiceState.status = status
      //console.log("newServiceState",newServiceState);
      //console.log("statssssssssssssssssssss",status);
      //console.log("state",state);

      //load only adequate language states
      let oldState=[...state]
      let inter=[]
      oldState.map((service,index)=>{
        if ((service.lan)===(counterpart.getLocale())) {
          inter.push(service)
        }
      });
      oldState =inter;
      
      //manage the state for the adequate language
      if ((counterpart.getLocale())==="en") {
        newServiceStateEn.status = status;
        newState = [
          ...state.slice(0, action.serviceIndex),
          newServiceStateEn,
          ...state.slice(action.serviceIndex + 1)
        ]
      }else if((counterpart.getLocale())==="fr"){
        newServiceStateFr.status = status;
        console.log('newServiceStateFr',...state);
        newState = [
          ...state.slice(0, action.serviceIndex+9), 
          newServiceStateFr,
          ...state.slice(action.serviceIndex+10)
        ]
      }
      return newState
    case "RECALCULATE_SERVICE_AMOUNT":
      service = state[serviceIndex]
      departmentIds = service.departments
      departmentAmounts = departmentIds.map((dept) => {
        return departments[dept - 1].amount
      })
      const departmentLastYearAmounts = departmentIds.map((dept) => {
        return departments[dept - 1].lastYearAmount
      })
      const sumOfDepartments = _.reduce(departmentAmounts, (memo, num) => {
        return memo + num
      }, 0)
      const sumOfLastYearDepartments = _.reduce(departmentLastYearAmounts, (memo, num) => {
        return memo + num
      }, 0)

      const delta = Number(((sumOfDepartments - sumOfLastYearDepartments) / sumOfLastYearDepartments * 100).toFixed(2))

      if ((counterpart.getLocale())==="en") {
        newServiceStateEn.amount = sumOfDepartments
        newServiceStateEn.percentChange = delta
        newState = [
          ...state.slice(0, service.index),
          newServiceStateEn,
          ...state.slice(service.index + 1)
        ]
      }else if((counterpart.getLocale())==="fr"){
        newServiceStateFr.amount = sumOfDepartments
        newServiceStateFr.percentChange = delta
        newState = [
          ...state.slice(0, service.index+9),
          newServiceStateFr,
          ...state.slice(service.index + 10)
        ]
      }
      //console.log('newstate2',newState);
      return newState
    case 'UPDATE_COMPLETED_DEPARTMENTS':
      service = state[serviceIndex]
      departmentIds = service.departments
      departmentAmounts = departmentIds.map((dept) => {
        return departments[dept - 1].amount
      })
      const updatedCount = _.reduce(departmentAmounts, (memo, num) => {
        num !== null ? memo++ : memo
        return memo
      }, 0)

      if ((counterpart.getLocale())==="en") {
        newServiceStateEn.completeSections = updatedCount
        newState = [
          ...state.slice(0, service.index),
          newServiceStateEn,
          ...state.slice(service.index + 1)
        ]
      }else if((counterpart.getLocale())==="fr"){
        newServiceStateFr.completeSections = updatedCount
        newState = [
          ...state.slice(0, service.index+9),
          newServiceStateFr,
          ...state.slice(service.index + 10)
        ]
      }
      return newState

    default:
      return state;
  }
}

export default services;
