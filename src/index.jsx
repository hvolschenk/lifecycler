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
  UNSAFE_componentWillMount() {
    const { componentWillMount, UNSAFE_componentWillMount } = this.props;
    applyLifecycleMethod(UNSAFE_componentWillMount || componentWillMount)();
  }
  componentDidMount() {
    applyLifecycleMethod(this.props.componentDidMount)();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { componentWillReceiveProps, UNSAFE_componentWillReceiveProps } = this.props;
    applyLifecycleMethod(UNSAFE_componentWillReceiveProps || componentWillReceiveProps)(nextProps);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const should = applyLifecycleMethod(this.props.shouldComponentUpdate)(nextProps, nextState);
    return isBoolean(should) ? should : true;
  }
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    const { componentWillUpdate, UNSAFE_componentWillUpdate } = this.props;
    applyLifecycleMethod(UNSAFE_componentWillUpdate || componentWillUpdate)(nextProps, nextState);
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
  componentWillMount: PropTypes.func,
  componentWillReceiveProps: PropTypes.func,
  componentWillUnmount: PropTypes.func,
  componentWillUpdate: PropTypes.func,
  shouldComponentUpdate: PropTypes.func,
  UNSAFE_componentWillMount: PropTypes.func,
  UNSAFE_componentWillReceiveProps: PropTypes.func,
  UNSAFE_componentWillUpdate: PropTypes.func,
};

Lifecycler.defaultProps = {
  componentDidMount: undefined,
  componentDidUpdate: undefined,
  componentWillMount: undefined,
  componentWillReceiveProps: undefined,
  componentWillUnmount: undefined,
  componentWillUpdate: undefined,
  shouldComponentUpdate: undefined,
  UNSAFE_componentWillMount: undefined,
  UNSAFE_componentWillReceiveProps: undefined,
  UNSAFE_componentWillUpdate: undefined,
};

export default Lifecycler;
