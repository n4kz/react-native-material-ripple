import React, { PropTypes, PureComponent } from 'react';
import { View, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import { styles, radius } from './styles.js';

export default class Ripple extends PureComponent {
  static defaultProps = {
    ...TouchableWithoutFeedback.defaultProps,

    rippleColor: 'rgb(0, 0, 0)',
    rippleOpacity: 0.30,
    rippleDuration: 400,
    rippleSize: 0,
    rippleContainerBorderRadius: 0,
    rippleCentered: false,
    disabled: false,
  };

  static propTypes = {
    ...Animated.View.propTypes,
    ...TouchableWithoutFeedback.propTypes,

    rippleColor: PropTypes.string,
    rippleOpacity: PropTypes.number,
    rippleDuration: PropTypes.number,
    rippleSize: PropTypes.number,
    rippleContainerBorderRadius: PropTypes.number,
    rippleCentered: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.onLayout = this.onLayout.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    this.renderRipple = this.renderRipple.bind(this);

    this.unique = 0;
    this.mounted = false;

    this.state = {
      width: 0,
      height: 0,
      ripples: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onLayout(event) {
    let { width, height } = event.nativeEvent.layout;
    let { onLayout } = this.props;

    if ('function' === typeof onLayout) {
      onLayout(event);
    }

    this.setState({ width, height });
  }

  onPress(event) {
    let { onPress } = this.props;

    if ('function' === typeof onPress) {
      onPress(event);
    }

    this.startRipple(event);
  }

  onLongPress(event) {
    let { onLongPress } = this.props;

    if ('function' === typeof onLongPress) {
      onLongPress(event);
    }

    this.startRipple(event);
  }

  onPressIn(event) {
    let { onPressIn } = this.props;

    if ('function' === typeof onPressIn) {
      onPressIn(event);
    }
  }

  onPressOut(event) {
    let { onPressOut } = this.props;

    if ('function' === typeof onPressOut) {
      onPressOut(event);
    }
  }

  startRipple(event) {
    let { rippleDuration, rippleCentered, rippleSize } = this.props;
    let { width, height } = this.state;

    let w2 = 0.5 * width;
    let h2 = 0.5 * height;

    let { locationX, locationY } = rippleCentered?
      { locationX: w2, locationY: h2 }:
      event.nativeEvent;

    let offsetX = Math.abs(w2 - locationX);
    let offsetY = Math.abs(h2 - locationY);

    let R = rippleSize > 0?
      0.5 * rippleSize:
      Math.sqrt(Math.pow(w2 + offsetX, 2) + Math.pow(h2 + offsetY, 2));

    let ripple = {
      unique: this.unique++,
      progress: new Animated.Value(0),
      locationX,
      locationY,
      R,
    };

    Animated
      .timing(ripple.progress, {
        toValue: 1,
        duration: rippleDuration,
        easing: Easing.out(Easing.ease),
      })
      .start(() => {
        if (this.mounted) {
          this.setState(({ ripples }) => ({ ripples: ripples.slice(1) }));
        }
      });

    this.setState(({ ripples }) => ({ ripples: ripples.concat(ripple) }));
  }

  renderRipple({ unique, progress, locationX, locationY, R }) {
    let { rippleColor, rippleOpacity } = this.props;

    let rippleStyle = {
      top: locationY - radius,
      left: locationX - radius,
      backgroundColor: rippleColor,

      transform: [{
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5 / radius, R / radius],
        }),
      }],

      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [rippleOpacity, 0],
      }),
    };

    return (
      <Animated.View style={[styles.ripple, rippleStyle]} key={unique} />
    );
  }

  render() {
    let { ripples } = this.state;
    let { onPress, onPressIn, onPressOut, onLongPress, onLayout } = this;
    let {
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      children,
      rippleContainerBorderRadius,
      onLayout: __ignored__,
      ...props
    } = this.props;

    let touchableProps = {
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      onPress,
      onPressIn,
      onPressOut,
      onLongPress: props.onLongPress? onLongPress : undefined,
      onLayout,
    };

    let containerStyle = {
      borderRadius: rippleContainerBorderRadius,
    };

    return (
      <TouchableWithoutFeedback {...touchableProps}>
        <Animated.View {...props} pointerEvents='box-only'>
          {children}

          <View style={[styles.container, containerStyle]}>
            {ripples.map(this.renderRipple)}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
