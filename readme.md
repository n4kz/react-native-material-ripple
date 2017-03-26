[npm-badge]: https://img.shields.io/npm/v/react-native-material-ripple.svg?colorB=ff6d00
[npm-url]: https://npmjs.com/package/react-native-material-ripple
[license-badge]: https://img.shields.io/npm/l/react-native-material-ripple.svg?colorB=448aff
[license-url]: https://raw.githubusercontent.com/n4kz/react-native-material-ripple/master/license.txt

# react-native-material-ripple

[![npm][npm-badge]][npm-url]
[![license][license-badge]][license-url]

Base component for touchable elements

![example](https://cloud.githubusercontent.com/assets/2055622/23309410/a363975a-fabf-11e6-8cd8-b9c5cca76b63.gif)

## Installation

```bash
npm install --save react-native-material-ripple
```

## Usage

```javascript
import React, { Component } from 'react';
import { Text } from 'react-native';
import Ripple from 'react-native-material-ripple';

class Example extends Component {
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

name                        | description                            | type     | default
--------------------------- | -------------------------------------- | --------:| ------------
rippleColor                 | Ripple color                           |   String | rgb(0, 0, 0)
rippleOpacity               | Ripple opacity                         |   Number | 0.3
rippleDuration              | Ripple duration in ms                  |   Number | 400
rippleSize                  | Ripple size restriction                |   Number | 0
rippleContainerBorderRadius | Ripple container border radius         |   Number | 0
rippleCentered              | Ripple always starts from center       |  Boolean | false
disabled                    | Ripple should ignore touches           |  Boolean | false
onPressIn                   | Touch moved in or started callback     | Function | -
onPressOut                  | Touch moved out or terminated callback | Function | -
onPress                     | Touch up inside bounds callback        | Function | -

## Example

```bash
git clone https://github.com/n4kz/react-native-material-ripple
cd react-native-material-ripple/example
npm install
react-native run-ios # or run-android
```

## Copyright and License

BSD License

Copyright 2017 Alexander Nazarov. All rights reserved.
