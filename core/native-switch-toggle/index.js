import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
function SwitchToggle(props) {
  var animXValue = useState(new Animated.Value(props.switchOn ? 1 : 0))[0];
  var getStart = function () {
    // prettier-ignore
    return props.type === undefined
            ? 0
            : props.type === 0
                ? 0
                : props.containerStyle && props.containerStyle.padding
                    ? props.containerStyle.padding * 2
                    : {};
  };
  var runAnimation = function () {
    var animValue = {
      fromValue: props.switchOn ? 0 : 1,
      toValue: props.switchOn ? 1 : 0,
      duration: props.duration,
      useNativeDriver: false,
    };
    Animated.timing(animXValue, animValue).start();
  };
  var endPos =
    props.containerStyle && props.circleStyle
      ? props.containerStyle.width -
        (props.circleStyle.width + props.containerStyle.padding * 2)
      : 0;
  var circlePosXEnd = endPos;
  var circlePosXStart = useState(getStart())[0];
  var prevSwitchOnRef = useRef();
  var prevSwitchOn = !!prevSwitchOnRef.current;
  useEffect(
    function () {
      prevSwitchOnRef.current = props.switchOn;
      if (prevSwitchOn !== props.switchOn) {
        runAnimation();
      }
    },
    [props.switchOn]
  );
  var generateRightText = function () {
    return (
      <Animated.View style={props.rightContainerStyle}>
        <Text style={props.textRightStyle}>{props.backTextRight}</Text>
      </Animated.View>
    );
  };
  var generateLeftText = function () {
    return (
      <Animated.View style={props.leftContainerStyle}>
        <Text style={props.textLeftStyle}>{props.backTextLeft}</Text>
      </Animated.View>
    );
  };
  return (
    <TouchableOpacity
      testID={props.testID}
      onPress={props.onPress}
      activeOpacity={0.5}
      disabled={props.disabled}
    >
      <Animated.View
        style={[
          styles.container,
          props.containerStyle,
          {
            backgroundColor: animXValue.interpolate({
              inputRange: [0, 1],
              outputRange: [props.backgroundColorOff, props.backgroundColorOn],
            }),
          },
        ]}
      >
        {generateLeftText()}
        <Animated.View
          style={[
            props.circleStyle,
            {
              backgroundColor: animXValue.interpolate({
                inputRange: [0, 1],
                outputRange: [props.circleColorOff, props.circleColorOn],
              }),
            },
            {
              transform: [
                {
                  translateX: animXValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [circlePosXStart, circlePosXEnd],
                  }),
                },
              ],
            },
            props.buttonStyle,
          ]}
        >
          <Animated.View style={props.buttonContainerStyle}>
            <Text style={props.buttonTextStyle}>{props.buttonText}</Text>
          </Animated.View>
        </Animated.View>
        {generateRightText()}
      </Animated.View>
    </TouchableOpacity>
  );
}
SwitchToggle.defaultProps = {
  switchOn: false,
  onPress: function () {},
  containerStyle: {
    width: 72,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgb(227,227,227)',
    padding: 3,
  },
  circleStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  backgroundColorOn: 'rgb(227,227,227)',
  backgroundColorOff: 'rgb(215,215,215)',
  circleColorOff: 'white',
  circleColorOn: 'rgb(102,134,205)',
  duration: 300,
};
export default SwitchToggle;
