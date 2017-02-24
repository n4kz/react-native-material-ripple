# react-native-material-ripple

Base component for touchable elements

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
      <Ripple onPressOut={ () => null }>
        <Text>touch me</Text>
      </Ripple>
    );
  }
}
```

## Properties

* `rippleColor`    - Ripple color (default: black)
* `rippleOpacity`  - Ripple opacity (default: 0.2)
* `rippleDuration` - Ripple duration in ms (default: 400)
* `rippleSize`     - Ripple size restriction (default: 0)

## Example

```bash
git clone https://github.com/n4kz/react-native-material-ripple.git
cd react-native-material-ripple
npm install
react-native run-ios # or run-android
```

## Copyright and License

BSD License

Copyright 2017 Alexander Nazarov. All rights reserved.
