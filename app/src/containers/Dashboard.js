import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'

const mapStateToProps = (state) => {
  //console.log(state);
  return state
}

const DashboardContainer = connect(
  mapStateToProps,
)(Dashboard)

export default DashboardContainer
