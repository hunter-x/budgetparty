import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import ProgressBar from '../ProgressBar'
import Translate    from 'react-translate-component';
const _t = Translate.translate;

class SavePage extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      name: (props.user && props.user.displayName) || '',
      email: (props.user && props.user.email) || '',
      student: 'false',
      schoolName: '',
      zipcode: '',
      comments: '',
    }
  }

  handleSubmit = (userId, data) => {
    this.props.onSubmit(userId, data)
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { departments, funds, user } = this.props;
    console.log('departments',departments);
    console.log('funds',funds);
    console.log('user',user);
    
    const departmentArray = Object.keys(departments).map(key => departments[key])

    const departmentsArray = departmentArray.map((item) => {
      return {
        item: item.name,
        amount: item.amount,
        explain: item.explainYourSpending,
      }
    });

    const userData = {
      comments: this.state.comments,
      name: this.state.name,
      email: this.state.email,
      student: this.state.student,
      schoolName: this.state.schoolName,
      zipcode: this.state.zipcode,
      userBudget: departmentsArray,
      totalBudget: funds.sumOfServiceSpending,
    }

    const showSchoolNameField = this.state.student === 'true'

    return (
      <div className="Submit__save-body">
        <h3 className="Submit__title">{ _t('review.save')}</h3>

        <label htmlFor="name">{ _t('review.name')}</label>
        <input type="text" name="name" id="name" placeholder="Name"
          onChange={this.handleChange} value={this.state.name}
        />

        <label htmlFor="email">{ _t('review.mail')}</label>
        <input type="email" name="email" id="email" placeholder="Email"
          onChange={this.handleChange} value={this.state.email}
        />

        <label htmlFor="student">{ _t('review.student')}</label>
        <select name="student" id="student" onChange={this.handleChange}
          value={this.state.student}
        >
          <option value="false">{ _t('review.no')}</option>
          <option value="true">{ _t('review.yes')}</option>
        </select>

        { showSchoolNameField &&
          <div>
            <label htmlFor="schoolName">
              { _t('review.schoolName')}
            </label>
            <input name="schoolName" id="schoolName" type="text" placeholder="School Name"
              onChange={this.handleChange} value={this.state.schoolName}
            />
          </div>
        }

        <label htmlFor="zipcode">{ _t('review.zipcode')}</label>
        <input type="text" name="zipcode" id="zipcode" placeholder="Zipcode" pattern="[0-9]{5}"
          onChange={this.handleChange} value={this.state.zipcode}
        />

        <label htmlFor="comments">{ _t('review.comments')}</label>
        <textarea type="textarea" name="comments" id="comments" placeholder="Comments"
          onChange={this.handleChange} value={this.state.comments}
        />

        <div className="Submit__review-buttons">
          <Link to="/submit/review" className="Service__edit-button">
          { _t('review.saveRevise')}
          </Link>
          <Link to="/done" className="Service__done-button"
            onClick={this.handleSubmit.bind(this, user.uid, userData)}
          >
          { _t('review.submit')}
          </Link>
        </div>

        <ProgressBar x={2} y={2} />
      </div>
    )
  }

}

SavePage.propTypes = {
  funds: PropTypes.shape({
    sumOfServiceSpending: PropTypes.number.isRequired,
    servicesSumPercentChange: PropTypes.number.isRequired,
  }).isRequired,
  departments: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    displayName: PropTypes.string,
  }),
};

export default SavePage;
