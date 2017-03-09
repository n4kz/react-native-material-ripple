import React, { PropTypes, Component } from 'react';
import { View, Animated, Easing, PanResponder } from 'react-native'
import { styles, radius } from './styles.js';

export default class Ripple extends Component {
  static defaultProps = {
    rippleColor: 'black',
    rippleOpacity: 0.30,
    rippleDuration: 400,
    rippleSize: 0,
    rippleContainerBorderRadius: 0,
    rippleCentered: false,
    disabled: false,
  };

  static propTypes = {
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

    this.state = {
      width: 0,
      height: 0,
      ripples: [],
    };
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => !this.props.disabled,
      onMoveShouldSetPanResponder: () => !this.props.disabled,

      onPanResponderGrant: (event, gestureState) => {
        this.setFocused(true);
      },

      onPanResponderMove: (event, gestureState) => {
        let { locationX, locationY } = event.nativeEvent;
        let { width, height } = this.state;

        let focused =
          (locationX >= 0 && locationX <= width) &&
          (locationY >= 0 && locationY <= height);

        this.setFocused(focused);
      },

      onPanResponderRelease: (event, gestureState) => {
        let { onPress, disabled } = this.props;

        if (this.focused && !disabled) {
          this.startRipple(event);

          if (typeof onPress === 'function') {
            onPress();
          }
        }

        this.setFocused(false);
      },

      onPanResponderTerminate: (event, gestureState) => {
        this.setFocused(false);
      },
    });
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
    let { rippleSize } = this.props;
    let { width, height } = event.nativeEvent.layout;

    this.setState({ width, height });
  }

  startRipple(event) {
    let { rippleDuration, rippleOpacity, rippleCentered } = this.props;
    let { rippleSize, rippleContainerBorderRadius: r } = this.props;
    let { ripples, width, height } = this.state;

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

    let unique = this.unique++;

    let ripple = {
      scale: new Animated.Value(0.5 / radius),
      opacity: new Animated.Value(rippleOpacity),

      unique, locationX, locationY,
    };

    ripples.push(ripple);

    Animated
      .parallel([
        Animated.timing(ripple.scale, {
          toValue: R / radius,
          duration: rippleDuration,
          easing: Easing.out(Easing.ease),
        }),

        Animated.timing(ripple.opacity, {
          toValue: 0,
          duration: rippleDuration,
          easing: Easing.out(Easing.ease),
        }),
      ])
      .start(() => {
        let ripples = this.state.ripples.slice(1);

        this.setState({ ripples });
      });

    this.setState({ ripples });
  }

  render() {
    let { children, rippleColor, rippleContainerBorderRadius, ...props } = this.props;
    let { ripples } = this.state;

    let containerStyle = {
      borderRadius: rippleContainerBorderRadius,
    };

    ripples = ripples
      .map(({ scale, opacity, locationX, locationY, unique }) => {
        let rippleStyle = {
          top: locationY - radius,
          left: locationX - radius,
          backgroundColor: rippleColor,

          transform: [{ scale }],
          opacity,
        };

        return (
          <Animated.View style={[ styles.ripple, rippleStyle ]} key={unique} pointerEvents='none' />
        );
      });

    return (
      <Animated.View onLayout={this.onLayout} {...props} {...this.panResponder.panHandlers}>
        {children}

        <View style={[ styles.container, containerStyle ]}>
          {ripples}
        </View>
      </Animated.View>
    );
  }
}
