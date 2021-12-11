import React from 'react';
import { View } from 'react-native';
import { Separator } from '..';

import { Text, Image } from '../../components';
import styles from './styles';

const Title = React.memo(({ title, titleTextStyle }) => {
  return <Text style={[styles.titleTextStyle, titleTextStyle]}>{title}</Text>;
});

const SubText = React.memo(({ title, subTextStyle, subImage }) => {
  return (
    <View style={styles.subTextContainer}>
      {subImage && <Image style={styles.subImage} source={subImage} />}
      <Text style={[styles.subTextStyle, subTextStyle]}>{title}</Text>
    </View>
  );
});

const TitleDescription = ({
  containerStyle,
  title,
  titleTextStyle,
  subTextStyle,
  subText,
  bar = true,
  barStyle,
  renderLeft,
  subImage,
}) => {
  return (
    <React.Fragment>
      {bar ? <Separator style={[styles.separator, barStyle]} /> : null}
      <View style={[styles.container, containerStyle]}>
        <Title {...{ title, titleTextStyle }} />
        <View style={styles.subContainer}>
          {renderLeft && renderLeft()}
          {subText && (
            <SubText title={subText} {...{ subTextStyle, subImage }} />
          )}
        </View>
        {/* <Text style={styles.productName}>{title}</Text> */}
        {/* <Text style={styles.time}>24 Nov, 2021, 8:00 PM</Text> */}
      </View>
    </React.Fragment>
  );
};

TitleDescription.propTypes = {};
TitleDescription.defaultProps = {};

export default React.memo(TitleDescription);
