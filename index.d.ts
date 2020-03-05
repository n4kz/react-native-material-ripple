declare module 'react-native-material-ripple' {
  import React from 'react';
  import {
    Animated,
    ViewProps,
    TouchableWithoutFeedbackProps,
  } from 'react-native';

  export type RippleProps = {
    rippleColor?: string;
    rippleOpacity?: number;
    rippleDuration?: number;
    rippleSize?: number;
    rippleContainerBorderRadius?: number;
    rippleCentered?: boolean;
    rippleSequential?: boolean;
    rippleFades?: boolean;
    rippleOverflow?: boolean;
    disabled?: boolean;
    onRippleAnimation?: (
      animation: Animated.CompositeAnimation,
      callback: () => void,
    ) => void;
  };

  const Ripple: React.ComponentType<RippleProps &
    Animated.AnimatedProps<ViewProps> &
    TouchableWithoutFeedbackProps>;

  export default Ripple;
}