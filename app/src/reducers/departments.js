import InitialState from '../config/InitialState';
import counterpart  from 'counterpart';

function departments(state = InitialState.departments, action = {}) {
  const deptId = action.departmentId - 1
  //console.log('depid',action.departmentId);
  const deptIdFr = deptId + 24;
    //console.log('depidfr',action.departmentId+23);

  const deptState = state[deptId]
  //console.log("state[deptId]",state[deptId]);
  const deptStatefr = state[deptIdFr];
    //console.log("state[deptIdFR]",state[deptIdFr]);

  var newDeptState,newDeptStatefr
  let newState

  switch (action.type) {
    case 'CHANGE_DEPARTMENT_PERCENT_CHANGE':
      //console.log("deptIdFr",deptIdFr);
      //console.log("deptId",deptId);
      //console.log('Look here for state',state);
      //console.log('Look here for action',action);

    let inter=[]        
    if (counterpart.getLocale()==="en") {
      newDeptState=deptState;
      if (state instanceof Array ) {
        state.map((department)=>{
            if ((department.lan)==="en") {
              inter.push(department)
            }
        });
      }else{
        var servicesArray = Object.keys(state).map( (key)=> { return state[key]; });
        servicesArray.map((department,index)=>{
          if ((department.lan)==="en") {
            inter.push(department)
          }
        });
      }
    }else if(counterpart.getLocale()==="fr"){
      //console.log('deptStatefr,',deptStatefr);
      newDeptState=deptStatefr;
      if (state instanceof Array ) {
        state.map((department)=>{
            if ((department.lan)==="fr") {
              inter.push(department)
            }
        });
      }else{
        var servicesArray = Object.keys(state).map( (key)=> { return state[key]; });
        servicesArray.map((department,index)=>{
          if ((department.lan)==="fr") {
            inter.push(department)
          }
        });
      }    
    }
          state=inter;

    //console.log('newDeptState.percentChange',newDeptState);
    //console.log('action',action); 
    if (newDeptState===undefined) {
      newDeptState=deptState
    }
      const newPercentChange = Number(newDeptState.percentChange + action.percentChange)

      newDeptState.percentChange = Number(newPercentChange.toFixed(2))

      newDeptState.amount =
        (deptState.lastYearAmount * (newPercentChange / 100))
        + deptState.lastYearAmount

      newState = Object.assign({}, state,
        { [deptId]: newDeptState },
      )
      //console.log('the newstate',newState);
      return newState
    case 'UPDATE_EXPLAIN_RESPONSE':
      newDeptState = Object.assign({}, deptState, {})
      newDeptState.explainYourSpending = action.text

      newState = Object.assign({}, state,
        { [deptId]: newDeptState },
      )

      return newState
    case 'RESET_DEPARTMENT_PERCENT_CHANGE':
      newDeptState = deptState

      newDeptState.amount = deptState.lastYearAmount
      newDeptState.percentChange = 0

      newState = Object.assign({}, state,
        { [deptId]: newDeptState },
      )

      return newState
    default:
      return state;

  }
}

export default departments;
