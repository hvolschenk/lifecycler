import isFunction from 'lodash.isfunction';
import PropTypes from 'prop-types';
import React from 'react';

const applyLifecycleMethod = method => (...parameters) => {
  if (isFunction(method)) {
    method(...parameters);
  }
};

class Lifecycler extends React.Component {
  componentDidMount() {
    applyLifecycleMethod(this.props.componentDidMount);
  }
  render() {
    return this.props.children;
  }
}

Lifecycler.propTypes = {
  children: PropTypes.node.isRequired,
  componentDidMount: PropTypes.func,
};

Lifecycler.defaultProps = {
  componentDidMount: undefined,
};

export default Lifecycler;
