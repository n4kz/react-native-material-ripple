declare module "react-native-material-ripple" {
  import { TouchableWithoutFeedbackProps } from "react-native";
  interface IProps extends TouchableWithoutFeedbackProps {
    rippleColor?: string;
    rippleOpacity?: number;
    rippleDuration?: number;
    rippleSize?: number;
    rippleContainerBorderRadius?: number;
    rippleCentered?: boolean;
    rippleSequential?: boolean;
    rippleFades?: boolean;
    disabled?: boolean;
    onRippleAnimation?: Function;
  }
  declare const Ripple: React.ComponentType<IProps>;
  export default Ripple;
}
