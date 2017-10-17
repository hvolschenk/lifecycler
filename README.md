# Lifecycler

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

Lifecycler exposes most lifecycle methods, pleae check the
[official component documentation](https://reactjs.org/docs/react-component.html) for more
information:

#### Mounting:

* `componentWillMount`
* `componentDidMount`

#### Updating

* `componentWillReceiveProps`
* `shouldComponentUpdate`
* `componentWillUpdate`
* `componentDidUpdate`

#### Unmounting

* `componentWillUnmount`
