import { mount, shallow } from 'enzyme';
import React from 'react';

import Lifecycler from './index';

const Children = () => (<p>This is a child of lifecycler</p>);

describe('Rendering', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Lifecycler><Children /></Lifecycler>,
      { disableLifecycleMethods: true },
    );
  });

  test('Renders the children', () => {
    expect(wrapper.find(Children).exists()).toBe(true);
  });
});

describe('Mounting', () => {
  describe('With old unsafe lifecycle methods', () => {
    const componentDidMount = jest.fn();

    beforeAll(() => {
      shallow(
        <Lifecycler componentDidMount={componentDidMount}>
          <Children />
        </Lifecycler>,
      );
    });

    test('Calls \'componentDidMount\'', () => {
      expect(componentDidMount.mock.calls.length).toBe(1);
    });
  });
});

describe('Explicitly returns a boolean \'true\' for \'shouldComponentUpdate\' if not boolean', () => {
  const shouldComponentUpdate = jest.fn().mockReturnValue({ not: 'boolean' });

  let instance;

  beforeAll(() => {
    const wrapper = shallow(
      <Lifecycler shouldComponentUpdate={shouldComponentUpdate}>
        <Children />
      </Lifecycler>,
    );
    instance = wrapper.instance();
  });

  test('Returns a boolean value', () => {
    expect(instance.shouldComponentUpdate()).toBe(true);
  });
});

describe('Returns the value for \'shouldComponentUpdate\' if it is a boolean', () => {
  const SHOULD_COMPONENT_UPDATE = false;
  const shouldComponentUpdate = jest.fn().mockReturnValue(SHOULD_COMPONENT_UPDATE);

  let instance;

  beforeAll(() => {
    const wrapper = shallow(
      <Lifecycler shouldComponentUpdate={shouldComponentUpdate}>
        <Children />
      </Lifecycler>,
    );
    instance = wrapper.instance();
  });

  test('Returns the boolean value', () => {
    expect(instance.shouldComponentUpdate()).toBe(SHOULD_COMPONENT_UPDATE);
  });
});

describe('Updating', () => {
  const componentDidUpdate = jest.fn();

  beforeAll(() => {
    const wrapper = mount(
      <Lifecycler componentDidUpdate={componentDidUpdate}>
        <Children />
      </Lifecycler>,
    );
    wrapper.setProps({});
  });

  test('Calls \'componentDidUpdate\'', () => {
    expect(componentDidUpdate.mock.calls.length).toBe(1);
  });
});

describe('Unmounting', () => {
  const componentWillUnmount = jest.fn();

  beforeAll(() => {
    const wrapper = mount(
      <Lifecycler componentWillUnmount={componentWillUnmount}>
        <Children />
      </Lifecycler>,
    );
    wrapper.unmount();
  });

  test('Calls \'componentWillUnmount\'', () => {
    expect(componentWillUnmount.mock.calls.length).toBe(1);
  });
});
