import React, { PropTypes, PureComponent } from 'react';
import { View, Animated, Easing, PanResponder } from 'react-native'
import { styles, radius } from './styles.js';

export default class Ripple extends PureComponent {
  static defaultProps = {
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

    this.unique = 0;
    this.focused = false;
    this.mounted = false;

    this.state = {
      width: 0,
      height: 0,
      ripples: [],
    };
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onShouldBlockNativeResponder: () => false,

      onStartShouldSetPanResponder: () => !this.props.disabled,
      onMoveShouldSetPanResponder: () => !this.props.disabled,

      onPanResponderGrant: () => {
        this.setFocused(true);
      },

      onPanResponderMove: (event) => {
        let { locationX, locationY } = event.nativeEvent;
        let { width, height } = this.state;

        let { hitSlop = {} } = this.props;
        let { top = 0, right = 0, bottom = 0, left = 0 } = hitSlop;

        let focused =
          (locationX >= -left && locationX <= width  + right) &&
          (locationY >= -top  && locationY <= height + bottom);

        this.setFocused(focused);
      },

      onPanResponderRelease: (event) => {
        let { onPress, disabled } = this.props;

        if (this.focused && !disabled) {
          this.startRipple(event);

          if (typeof onPress === 'function') {
            onPress();
          }
        }

        this.setFocused(false);
      },

      onPanResponderTerminate: () => {
        this.setFocused(false);
      },
    });
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  setFocused(focused) {
    if (focused ^ this.focused) {
      this.onFocusChange(this.focused = focused);
    }
  }

  onFocusChange(focused) {
    let { onPressOut, onPressIn } = this.props;

    if (focused) {
      if (typeof onPressIn === 'function') {
        onPressIn();
      }
    } else {
      if (typeof onPressOut === 'function') {
        onPressOut();
      }
    }
  }

  onLayout(event) {
    let { width, height } = event.nativeEvent.layout;
    let { onLayout } = this.props;

    if ('function' === typeof onLayout) {
      onLayout(event);
    }

    this.setState({ width, height });
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
      locationX, locationY, R,
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

  render() {
    let { children, rippleColor, rippleOpacity, rippleContainerBorderRadius, ...props } = this.props;
    let { ripples } = this.state;

    let containerStyle = {
      borderRadius: rippleContainerBorderRadius,
    };

    ripples = ripples
      .map(({ unique, progress, locationX, locationY, R }) => {
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
          <Animated.View style={[ styles.ripple, rippleStyle ]} key={unique} pointerEvents='none' />
        );
      });

    return (
      <Animated.View {...props} {...this.panResponder.panHandlers} onLayout={this.onLayout}>
        {children}

        <View style={[ styles.container, containerStyle ]}>
          {ripples}
        </View>
      </Animated.View>
    );
  }
}
