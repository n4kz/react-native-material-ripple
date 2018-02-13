[npm-badge]: https://img.shields.io/npm/v/react-native-material-ripple.svg?colorB=ff6d00
[npm-url]: https://npmjs.com/package/react-native-material-ripple
[license-badge]: https://img.shields.io/npm/l/react-native-material-ripple.svg?colorB=448aff
[license-url]: https://raw.githubusercontent.com/n4kz/react-native-material-ripple/master/license.txt
[codeclimate-badge]: https://img.shields.io/codeclimate/maintainability/n4kz/react-native-material-ripple.svg
[codeclimate-url]: https://codeclimate.com/github/n4kz/react-native-material-ripple
[example-url]: https://cloud.githubusercontent.com/assets/2055622/24832328/459afaf0-1cb6-11e7-975d-accedb67a716.gif
[touchable]: https://facebook.github.io/react-native/docs/touchablewithoutfeedback.html

# react-native-material-ripple

[![npm][npm-badge]][npm-url]
[![license][license-badge]][license-url]
[![codeclimate][codeclimate-badge]][codeclimate-url]

Base component for touchable elements

![example][example-url]

## Features

* Easy to use
* Configurable
* Consistent look and feel on iOS and Android
* Can be used as drop-in replacement for [TouchableWithoutFeedback][touchable]
* Pure javascript implementation

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
      <Ripple>
        <Text>touch me</Text>
      </Ripple>
    );
  }
}
```

## Properties

 name                        | description                            | type     | default
:--------------------------- |:-------------------------------------- | --------:|:------------
 rippleColor                 | Ripple color                           |   String | rgb(0, 0, 0)
 rippleOpacity               | Ripple opacity                         |   Number | 0.3
 rippleDuration              | Ripple duration in ms                  |   Number | 400
 rippleSize                  | Ripple size restriction                |   Number | 0
 rippleContainerBorderRadius | Ripple container border radius         |   Number | 0
 rippleCentered              | Ripple always starts from center       |  Boolean | false
 rippleSequential            | Ripple should start in sequence        |  Boolean | false
 rippleFades                 | Ripple fades out                       |  Boolean | true
 disabled                    | Ripple should ignore touches           |  Boolean | false
 onPressIn                   | Touch moved in or started callback     | Function | -
 onPressOut                  | Touch moved out or terminated callback | Function | -
 onPress                     | Touch up inside bounds callback        | Function | -
 onLongPress                 | Touch delayed after onPressIn callback | Function | -
 onRippleAnimation           | Animation start callback               | Function | -

Other [TouchableWithoutFeedback][touchable] properties will also work

## Example

```bash
git clone https://github.com/n4kz/react-native-material-ripple
cd react-native-material-ripple/example
npm install
react-native run-ios # or run-android
```

## Copyright and License

BSD License

Copyright 2017-2018 Alexander Nazarov. All rights reserved.
