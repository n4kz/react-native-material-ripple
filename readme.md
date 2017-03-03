# react-native-material-ripple

Base component for touchable elements

![Example](https://cloud.githubusercontent.com/assets/2055622/23309410/a363975a-fabf-11e6-8cd8-b9c5cca76b63.gif)

## Installation

```bash
npm install --save react-native-material-ripple
```

## Usage

```javascript
import React, { Component } from 'react';
import { Text } from 'react-native';
import Ripple from 'react-native-material-ripple';

export default class Example extends Component {
  render() {
    return (
      <Ripple onPress={ () => null }>
        <Text>touch me</Text>
      </Ripple>
    );
  }
}
```

## Properties

* `rippleColor`                 - Ripple color (default: black)
* `rippleOpacity`               - Ripple opacity (default: 0.2)
* `rippleDuration`              - Ripple duration in ms (default: 400)
* `rippleSize`                  - Ripple size restriction (default: 0)
* `rippleContainerBorderRadius` - Border radius for ripple container (default: 0)

## Callbacks

* `onPressIn`  - Called when component receives touch
* `onPressOut` - Called when component looses touch
* `onPress`    - Called on touch up in component bounds

## Example

```bash
git clone https://github.com/n4kz/react-native-material-ripple.git
cd react-native-material-ripple/example
npm install
react-native run-ios # or run-android
```

## Copyright and License

BSD License

Copyright 2017 Alexander Nazarov. All rights reserved.
