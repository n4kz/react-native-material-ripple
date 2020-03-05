declare module "react-native-material-ripple" {
  import { PureComponent } from "react";
  import {
    TouchableWithoutFeedbackProps,
    Animated,
    ViewProps
  } from "react-native";

  export interface RippleProps
    extends TouchableWithoutFeedbackProps,
      ViewProps {
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
      animation: Animated.TimingAnimationConfig,
      callback: () => void
    ) => void;
  }

  export default class Ripple extends PureComponent<RippleProps> {}
}
