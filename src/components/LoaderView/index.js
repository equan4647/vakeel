// @flow
import { View, StatusBar, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import React from 'react';

import { Colors } from '../../theme';
import styles from './styles';

const LoaderView = ({ renderContent }) => {
  return (
    <>
      <StatusBar networkActivityIndicatorVisible={true} />
      <Modal
        style={styles.modal}
        backdropOpacity={0.4}
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={true}
      >
        <View style={styles.container}>
          {renderContent ? (
            renderContent()
          ) : (
            <ActivityIndicator animating size="large" color={Colors.white} />
          )}
        </View>
      </Modal>
    </>
  );
};

LoaderView.propTypes = {
  renderContent: PropTypes.func,
};

LoaderView.defaultProps = {
  renderContent: undefined,
};

export default LoaderView;
