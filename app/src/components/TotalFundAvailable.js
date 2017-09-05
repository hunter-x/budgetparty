import React from 'react'
import { FormattedNumber } from 'react-intl'
import PropTypes from 'prop-types';
import Translate    from 'react-translate-component';
const _t = Translate.translate;

const TotalFundAvailable = (props) => {
  const { generalFund, generalFundsRemaining } = props.funds
  const remainingAmount = generalFundsRemaining || generalFund

  return (
    <div className="TotalFundsAvailable">
      <h4 className="TotalFundsAvailable__header">
        {_t('navigation.available')}<br/>
        {_t('navigation.available2')}
      </h4>
      <h4 className="TotalFundsAvailable__dollars">
        <FormattedNumber
          value={remainingAmount}
          minimumFractionDigits={0}
          maximumFractionDigits={0}
        /> Dinar
      </h4>
    </div>
  )
}

export default TotalFundAvailable

TotalFundAvailable.propTypes = {
  funds: PropTypes.shape({
    generalFund: PropTypes.number,
    generalFundsRemaining: PropTypes.number,
  }).isRequired,
};
