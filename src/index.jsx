import isBoolean from 'lodash.isboolean';
import isFunction from 'lodash.isfunction';
import PropTypes from 'prop-types';
import React from 'react';

const applyLifecycleMethod = (method) => (...parameters) => {
  if (isFunction(method)) {
    return method(...parameters);
  }
  return undefined;
};

class Lifecycler extends React.Component {
  componentDidMount() {
    applyLifecycleMethod(this.props.componentDidMount)();
  }
  shouldComponentUpdate(nextProps, nextState) {
    const should = applyLifecycleMethod(this.props.shouldComponentUpdate)(nextProps, nextState);
    return isBoolean(should) ? should : true;
  }
  componentDidUpdate(previousProps, previousState) {
    applyLifecycleMethod(this.props.componentDidUpdate)(previousProps, previousState);
  }
  componentWillUnmount() {
    applyLifecycleMethod(this.props.componentWillUnmount)();
  }
  render() {
    return this.props.children;
  }
}

Lifecycler.propTypes = {
  children: PropTypes.node.isRequired,
  componentDidMount: PropTypes.func,
  componentDidUpdate: PropTypes.func,
  componentWillUnmount: PropTypes.func,
  shouldComponentUpdate: PropTypes.func,
};

Lifecycler.defaultProps = {
  componentDidMount: undefined,
  componentDidUpdate: undefined,
  componentWillUnmount: undefined,
  shouldComponentUpdate: undefined,
};

export default Lifecycler;
