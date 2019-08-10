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
  describe('With explicitly unsafe lifecycle methods', () => {
    const componentDidMount = jest.fn();
    const componentWillMount = jest.fn();
    const UNSAFE_componentWillMount = jest.fn();

    beforeAll(() => {
      shallow(
        <Lifecycler
          componentDidMount={componentDidMount}
          componentWillMount={componentWillMount}
          UNSAFE_componentWillMount={UNSAFE_componentWillMount}
        >
          <Children />
        </Lifecycler>,
      );
    });

    test('Calls \'componentDidMount\'', () => {
      expect(componentDidMount.mock.calls.length).toBe(1);
    });

    test('Calls \'UNSAFE_componentWillMount\'', () => {
      expect(UNSAFE_componentWillMount.mock.calls.length).toBe(1);
    });

    test('Does not call \'componentWillMount\'', () => {
      expect(componentWillMount.mock.calls.length).toBe(0);
    });
  });

  describe('With old unsafe lifecycle methods', () => {
    const componentDidMount = jest.fn();
    const componentWillMount = jest.fn();

    beforeAll(() => {
      shallow(
        <Lifecycler
          componentDidMount={componentDidMount}
          componentWillMount={componentWillMount}
        >
          <Children />
        </Lifecycler>,
      );
    });

    test('Calls \'componentDidMount\'', () => {
      expect(componentDidMount.mock.calls.length).toBe(1);
    });

    test('Calls \'componentWillMount\'', () => {
      expect(componentWillMount.mock.calls.length).toBe(1);
    });
  });
});

describe('Updating', () => {
  describe('With explicitly unsafe lifecycle methods', () => {
    const componentDidUpdate = jest.fn();
    const componentWillReceiveProps = jest.fn();
    const componentWillUpdate = jest.fn();
    const shouldComponentUpdate = jest.fn();
    const UNSAFE_componentWillReceiveProps = jest.fn();
    const UNSAFE_componentWillUpdate = jest.fn();
    const nextProps = { next: 'props' };

    let instanceProps;

    beforeAll(() => {
      const wrapper = shallow(
        <Lifecycler
          componentDidUpdate={componentDidUpdate}
          componentWillReceiveProps={componentWillReceiveProps}
          componentWillUpdate={componentWillUpdate}
          shouldComponentUpdate={shouldComponentUpdate}
          UNSAFE_componentWillReceiveProps={UNSAFE_componentWillReceiveProps}
          UNSAFE_componentWillUpdate={UNSAFE_componentWillUpdate}
        >
          <Children />
        </Lifecycler>,
      );
      instanceProps = wrapper.instance().props;
      wrapper.setProps(nextProps);
    });

    test('Calls \'UNSAFE_componentWillReceiveProps\'', () => {
      expect(UNSAFE_componentWillReceiveProps.mock.calls[0][0])
        .toEqual({ ...instanceProps, ...nextProps });
    });

    test('Does not call \'componentWillReceiveProps\'', () => {
      expect(componentWillReceiveProps.mock.calls.length).toBe(0);
    });

    test('Calls \'shouldComponentUpdate\'', () => {
      expect(shouldComponentUpdate.mock.calls[0])
        .toEqual([{ ...instanceProps, ...nextProps }, {}]);
    });

    test('Calls \'UNSAFE_componentWillUpdate\'', () => {
      expect(UNSAFE_componentWillUpdate.mock.calls[0])
        .toEqual([{ ...instanceProps, ...nextProps }, {}]);
    });

    test('Does not call \'componentWillUpdate\'', () => {
      expect(componentWillUpdate.mock.calls.length).toBe(0);
    });

    test('Calls \'componentDidUpdate\'', () => {
      expect(componentDidUpdate.mock.calls[0]).toEqual([instanceProps, null]);
    });
  });

  describe('With old unsafe lifecycle methods', () => {
    const componentDidUpdate = jest.fn();
    const componentWillReceiveProps = jest.fn();
    const componentWillUpdate = jest.fn();
    const shouldComponentUpdate = jest.fn();
    const nextProps = { next: 'props' };

    let instanceProps;

    beforeAll(() => {
      const wrapper = shallow(
        <Lifecycler
          componentDidUpdate={componentDidUpdate}
          componentWillReceiveProps={componentWillReceiveProps}
          componentWillUpdate={componentWillUpdate}
          shouldComponentUpdate={shouldComponentUpdate}
        >
          <Children />
        </Lifecycler>,
      );
      instanceProps = wrapper.instance().props;
      wrapper.setProps(nextProps);
    });

    test('Calls \'componentWillReceiveProps\'', () => {
      expect(componentWillReceiveProps.mock.calls[0])
        .toEqual([{ ...instanceProps, ...nextProps }]);
    });

    test('Calls \'componentWillUpdate\'', () => {
      expect(componentWillUpdate.mock.calls[0])
        .toEqual([{ ...instanceProps, ...nextProps }, {}]);
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
