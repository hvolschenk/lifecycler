# Lifecycler

[![Build Status](https://travis-ci.org/hvolschenk/lifecycler.svg?branch=master)](https://travis-ci.org/hvolschenk/lifecycler)
[![Coverage Status](https://coveralls.io/repos/github/hvolschenk/lifecycler/badge.svg?branch=master)](https://coveralls.io/github/hvolschenk/lifecycler?branch=master)
[![NSP Status](https://nodesecurity.io/orgs/hendrik-volschenk/projects/699d7ccc-dc11-4800-b946-29d3ee4249de/badge)](https://nodesecurity.io/orgs/hendrik-volschenk/projects/699d7ccc-dc11-4800-b946-29d3ee4249de)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A simple-to-use React rendered lifecycle component. Hook into lifecycle events while building
stateless components.

## Installing

Lifecycler can be installed via **npm**:

```bash
$ npm i -S lifecycler
```

## Usage

Use Lifecycler inside your React project by wrapping it around a component to add lifecycle methods
to:

```js
import React from 'react';
import Lifecycler from 'lifecycler';

const logAfterMounting = () => console.log('The component has mounted');

const MyComponent = () => (
  <Lifecycler componentDidMount={logAfterMounting}>
    <p>This here is wrapper in Lifecycler!</p>
  </Lifecycler>
);

export default MyComponent;
```

### Properties

Lifecycler exposes most lifecycle methods, please check the
[official component documentation](https://reactjs.org/docs/react-component.html) for more
information:

#### Mounting:

* `componentWillMount()`

* `componentDidMount()`

#### Updating

* `componentWillReceiveProps(nextProps)`

* `shouldComponentUpdate(nextProps, nextState)`

  This method should return a boolean value. If no value (or a non-booean value) is returned,
  **Lifecycler** will return `true` for you. Because these are still stateless components,
  `nextState` will always be `null`.

* `componentWillUpdate(nextProps, nextState)`

  Because these are still stateless components, `nextState` will always be `null`.

* `componentDidUpdate(prevProps, prevState)`

  Because these are still stateless components, `nextState` will always be `null`.

#### Unmounting

* `componentWillUnmount()`
