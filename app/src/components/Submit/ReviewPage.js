import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom'
import ProgressBar from '../ProgressBar'

import backArrow from '../../images/back_arrow.svg'
import forwardArrow from '../../images/forward_arrow.svg'

import Translate    from 'react-translate-component';
const _t = Translate.translate;

const ReviewPage = (props) => {
  const { services } = props

  return (
    <div>
      <div className="Submit__review-header">
        <img src="/images/submit.svg" alt="Envelope Icon" />
      </div>
      <div className="Submit__body">
        <h3>{_t('review.titleReview')} </h3>
        <h4 className="Submit__review-subtitle"> { _t('review.subReview')}</h4>
        {services.map((service) => {
          const incDecText = service.percentChange > 0 ? _t('review.increase') : _t('review.decrease')

          // Skip Welcome & Submit
          if (service.index === 0 || service.index === 5) return false

          return (
            <p className="Submit__review-service-list" key={service.index}>
              {incDecText} {service.title} { _t('review.by')} {service.percentChange || 0}%
            </p>
          )
        })}
        <Link to="/dashboard" className="Submit__revise-link">{ _t('review.revise')}</Link>
        <div className="Submit__review-buttons">
          <Link to="/submit" className="Department__edit-button">
            <div className="flexconatiner">
              <img src={backArrow} alt="Back Arrow" className="left" style={{ padding: '6px 0 0 10px' }} />
              <span className="right" style={{ paddingRight: '20px' }}> { _t('review.prev')} </span>
            </div>

          </Link>
          <Link to="/submit/save" className="Department__done-button">
            <span className="left" style={{ paddingLeft: '20px' }}>{ _t('review.next')}</span>
            <img src={forwardArrow} alt="Back Arrow" className="right" style={{ padding: '6px 10px 0 0' }} />
          </Link>
        </div>
        <ProgressBar x={1} y={2} />
      </div>
    </div>
  )
};

ReviewPage.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default ReviewPage;