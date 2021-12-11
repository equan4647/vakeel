import React from 'react';
import { View } from 'react-native';
import { Separator } from '..';

import { Text, ButtonView, Image } from '../../components';
import { Metrics, Images, Colors, AppStyles } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';

const LeftTitle = React.memo(({ title, leftTextStyle }) => {
  return (
    <Text style={[styles.leftTitleTextStyle, leftTextStyle]}>{title}</Text>
  );
});

const RightTitle = React.memo(
  ({
    rightTitle,
    rightTextStyle,
    onPress,
    rightTextIcon,
    rightTitleButtonProps,
  }) => {
    const TagView = onPress ? ButtonView : View;
    const { hitSlop } = Metrics;
    const style = rightTextIcon ? AppStyles.rowAligned : {};
    const customProps = onPress
      ? { onPress, hitSlop, style, ...rightTitleButtonProps }
      : rightTitleButtonProps;
    return (
      <TagView {...customProps}>
        <Text style={[styles.rightTitleTextStyle, rightTextStyle]}>
          {rightTitle}
        </Text>
        {rightTextIcon && (
          <Image
            style={{ marginLeft: 10, marginTop: 2 }}
            source={Images.icons.arrowDown}
          />
        )}
      </TagView>
    );
  }
);

const HorizontalTitle = props => {
  const {
    containerStyle,
    title,
    leftTextStyle,
    rightTitle,
    bar,
    barStyle,
    onEditPress,
  } = props;
  return (
    <React.Fragment>
      {bar ? <Separator style={[styles.separator, barStyle]} /> : null}
      <View style={[styles.container, containerStyle]}>
        <LeftTitle {...{ title, leftTextStyle }} />

        {rightTitle ? <RightTitle {...props} /> : null}
        {onEditPress ? (
          <RightTitle
            rightTitle={strings('app.editCaps')}
            {...{
              rightTextStyle: { color: Colors.primary },
              onPress: onEditPress,
            }}
          />
        ) : null}
      </View>
    </React.Fragment>
  );
};
export default React.memo(HorizontalTitle);
