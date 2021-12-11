import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { ScrollViewApi } from '../../components';

import { carouselActions, carouselSelectors } from '../../ducks/carousel';
import { requestFlagSelectors } from '../../ducks/requestFlags';

const CarouselHttp = ({
  identifier,
  url,
  payload,
  renderContent,
  dynamicAction,
  contentContainerStyle,
}) => {
  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag(`CAROUSEL_LIST_${identifier}`)
  );

  const data = useSelector(carouselSelectors.getCarouselData(identifier));

  return (
    <ScrollViewApi
      requestAction={carouselActions.requestCarouselData}
      content={renderContent}
      {...{
        data,
        requestFlags,
        payload,
        url,
        identifier,
        dynamicAction,
        contentContainerStyle,
      }}
    />
  );
};

CarouselHttp.propTypes = {
  identifier: PropTypes.string.isRequired,
  url: PropTypes.object.isRequired,
  payload: PropTypes.object,
  dynamicAction: PropTypes.any.isRequired,
  renderContent: PropTypes.func.isRequired,
  contentContainerStyle: ViewPropTypes.style,
};
CarouselHttp.defaultProps = { payload: {}, contentContainerStyle: {} };

export default CarouselHttp;
