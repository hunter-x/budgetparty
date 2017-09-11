import React from 'react'
import { FormattedNumber } from 'react-intl'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Translate    from 'react-translate-component';
const _t = Translate.translate;

const IntroPage = (props) => {
  const { funds } = props

  return (
    <div className="Submit__intro-body">
      <img src={'/images/submit.svg'} className="Submit__img" alt="Envelope Icon" />
      <h3 className="Submit__title">{_t('review.budget')}</h3>
      <span className="Submit__desc">
        <FormattedNumber
          value={funds.sumOfServiceSpending}
            minimumFractionDigits={0}
          maximumFractionDigits={0}
        />
      </span>
      <span className="Submit__smallcaps">
        <FormattedNumber
          value={funds.servicesSumPercentChange}
          minimumFractionDigits={0}
          maximumFractionDigits={1}
        />
        <span>{_t('review.percent')}</span>
      </span>
      <Link to="/submit/review" className="Submit__next-button">
      {_t('review.submit')}
      </Link>
    </div>
  )
}

export default IntroPage

IntroPage.propTypes = {
  funds: PropTypes.shape({
    sumOfServiceSpending: PropTypes.number.isRequired,
    servicesSumPercentChange: PropTypes.number.isRequired,
  }).isRequired,
}
