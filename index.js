import React, { PropTypes, Component } from 'react';
import { View, Animated, Easing, PanResponder } from 'react-native'
import { styles, radius } from './styles.js';

export default class Ripple extends Component {
  static defaultProps = {
    rippleColor: 'black',
    rippleOpacity: 0.20,
    rippleDuration: 400,
    rippleSize: 0,
    rippleContainerBorderRadius: 0,
  };

  static propTypes = {
    rippleColor: PropTypes.string,
    rippleOpacity: PropTypes.number,
    rippleDuration: PropTypes.number,
    rippleSize: PropTypes.number,
    rippleContainerBorderRadius: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.unique = 0;

    this.state = {
      size: 0,
      ripples: [],
    };
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return true;
      },

      onPanResponderGrant: (event, gestureState) => {
        let { onPressIn } = this.props;

        if (typeof onPressIn === 'function') {
          onPressIn();
        }
      },

      onPanResponderRelease: (event, gestureState) => {
        let { onPressOut } = this.props;

        if (typeof onPressOut === 'function') {
          onPressOut();
        }

        this.startRipple(event);
      }
    });
  }

  onLayout(event) {
    let { rippleSize } = this.props;
    let { width, height } = event.nativeEvent.layout;

    let size = rippleSize > 0?
      rippleSize : Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

    this.setState({ size });
  }

  startRipple(event) {
    let { locationX, locationY } = event.nativeEvent;
    let { rippleDuration, rippleOpacity } = this.props;
    let { ripples, size } = this.state;

    let unique = this.unique++;

    let ripple = {
      scale: new Animated.Value(1 / (radius * 2)),
      opacity: new Animated.Value(rippleOpacity),

      unique, locationX, locationY,
    };

    ripples.push(ripple);

    Animated
      .parallel([
        Animated.timing(ripple.scale, {
          toValue: size / (radius * 2),
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

    ripples = ripples
      .map(($_) => {
        let { scale, opacity, unique } = $_;

        let style = {
          top: $_.locationY - radius,
          left: $_.locationX - radius,
          backgroundColor: rippleColor,

          transform: [{ scale }],
          opacity,
        };

        return (
          <Animated.View style={[ styles.ripple, style ]} key={unique} pointerEvents='none' />
        );
      });

    return (
      <Animated.View onLayout={this.onLayout.bind(this)} {...props} {...this.panResponder.panHandlers}>
        {children}

        <View style={[styles.container, { borderRadius: rippleContainerBorderRadius }]}>
          {ripples}
        </View>
      </Animated.View>
    );
  }
}
