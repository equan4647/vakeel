import React from 'react';
import PropTypes from 'prop-types';

import { strings } from '../../utils/i18n';
import styles from './styles';
import { AmountRow } from '..';

const CartFooter = React.memo(({ total, delivery }) => (
  <>
    <AmountRow
      title={strings('app.total')}
      amount={total}
      style={styles.subTotal}
    />

    {delivery ? (
      <AmountRow title={strings('app.delivery')} amount={delivery} />
    ) : null}
  </>
));
CartFooter.propTypes = {
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  delivery: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
CartFooter.defaultProps = {
  total: 0,
  delivery: 0,
};
export default CartFooter;
