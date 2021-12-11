import React from 'react';
import PropTypes from 'prop-types';
import { View, Platform } from 'react-native';

import ViewMoreText from 'react-native-view-more-text';

import { Text } from '..';
import styles from './styles';

export default class ReadMoreText extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    text: PropTypes.string.isRequired,
    numberOfLines: PropTypes.number,
    textSize: PropTypes.string,
  };

  static defaultProps = {
    numberOfLines: 3,
    textSize: 'normal',
    style: {},
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.text !== this.props.text) {
      setTimeout(() => {
        this.showText &&
          this.showText.updateComponent() &&
          this.showText.updateComponent();
      }, 500);
      return true;
    }
    if (nextState !== this.state) {
      return true;
    }

    return false;
  }

  constructor(props) {
    super(props);
    this.state = {
      showText: false,
      numberOfLines: props.numberOfLines,
    };
  }

  _renderTruncatedFooter = handlePress => {
    const { textSize } = this.props;
    return (
      <Text onPress={handlePress} style={styles.readMore}>
        Read more
      </Text>
    );
  };

  _renderRevealedFooter = handlePress => {
    const { textSize } = this.props;
    return (
      <Text onPress={handlePress} style={styles.readMore}>
        Show less
      </Text>
    );
  };

  render() {
    const { text, textSize, style } = this.props;
    const { showText, numberOfLines } = this.state;

    return (
      <ViewMoreText
        key={text.length}
        numberOfLines={numberOfLines}
        renderViewLess={this._renderRevealedFooter}
        renderViewMore={this._renderTruncatedFooter}
        textStyle={styles.review}
      >
        <Text style={styles.review}>{text}</Text>
      </ViewMoreText>
    );
  }
}
