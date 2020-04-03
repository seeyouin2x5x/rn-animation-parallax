import React, { CSSProperties, FC } from 'react';
import { Animated } from 'react-native';

const size = {
  minHeight: 250,
  maxHeight: 600,
};

let viewState = true;
let animationValue = new Animated.Value(size.minHeight);

const toggleAnimation = () => {
  viewState
    ? Animated.timing(animationValue, {
      toValue: size.minHeight,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      viewState = false;
    })
    : Animated.timing(animationValue, {
      toValue: size.maxHeight,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      viewState = true;
    });
};

interface Props {
  style?: CSSProperties;
  minHeight?: number;
  maxHeight?: number;
}

const Parallax: FC<Props> = ({
  children,
  style,
  minHeight = size.minHeight,
  maxHeight = size.maxHeight,
  ...rest
}) => {
  const animatedStyle = { height: animationValue };
  size.minHeight = minHeight;
  size.maxHeight = maxHeight;
  return (
    <Animated.View style={
      [{
        backgroundColor: '#140448',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
        animatedStyle
      ]}
      {...rest}>
      {children}
    </Animated.View>
  );
};

export { Parallax, toggleAnimation };
