import { mount, shallow } from 'enzyme';
import React from 'react';

import Lifecycler from './index';

describe('<Lifecycler />', () => {
  const Children = () => (<p>This is a child of lifecycler</p>);
  test('Mounts correctly', () => {
    const componentDidMount = jest.fn();
    const componentWillMount = jest.fn();
    const wrapper = shallow(
      <Lifecycler
        componentDidMount={componentDidMount}
        componentWillMount={componentWillMount}
      >
        <Children />
      </Lifecycler>,
    );

    expect(wrapper.find(Children).exists).toBeTruthy();
    expect(componentDidMount).toHaveBeenCalledTimes(1);
    expect(componentWillMount).toHaveBeenCalledTimes(1);
  });

  test('Updates correctly', () => {
    const componentDidUpdate = jest.fn();
    const componentWillReceiveProps = jest.fn();
    const componentWillUpdate = jest.fn();
    const shouldComponentUpdate = jest.fn();
    const nextProps = {
      next: 'props',
    };
    const wrapper = mount(
      <Lifecycler
        componentDidUpdate={componentDidUpdate}
        componentWillReceiveProps={componentWillReceiveProps}
        componentWillUpdate={componentWillUpdate}
        shouldComponentUpdate={shouldComponentUpdate}
      >
        <Children />
      </Lifecycler>,
    );
    const oldProps = wrapper.instance().props;
    const expectedProps = { ...oldProps, ...nextProps };
    wrapper.setProps(nextProps);

    expect(componentWillReceiveProps).toHaveBeenCalledTimes(1);
    expect(componentWillReceiveProps.mock.calls[0][0]).toEqual(expectedProps);
    expect(shouldComponentUpdate).toHaveBeenCalledTimes(1);
    expect(shouldComponentUpdate.mock.calls[0][0]).toEqual(expectedProps);
    expect(shouldComponentUpdate.mock.calls[0][1]).toEqual(null);
    expect(componentWillUpdate).toHaveBeenCalledTimes(1);
    expect(componentWillUpdate.mock.calls[0][0]).toEqual(expectedProps);
    expect(componentWillUpdate.mock.calls[0][1]).toEqual(null);
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
    expect(componentDidUpdate.mock.calls[0][0]).toEqual(oldProps);
    expect(componentDidUpdate.mock.calls[0][1]).toEqual(null);
  });

  test('Updates correctly when component should update', () => {
    const componentDidUpdate = jest.fn();
    const componentWillReceiveProps = jest.fn();
    const componentWillUpdate = jest.fn();
    const shouldComponentUpdate = jest.fn().mockReturnValue(true);
    const nextProps = {
      next: 'props',
    };
    const wrapper = mount(
      <Lifecycler
        componentDidUpdate={componentDidUpdate}
        componentWillReceiveProps={componentWillReceiveProps}
        componentWillUpdate={componentWillUpdate}
        shouldComponentUpdate={shouldComponentUpdate}
      >
        <Children />
      </Lifecycler>,
    );
    const oldProps = wrapper.instance().props;
    const expectedProps = { ...oldProps, ...nextProps };
    wrapper.setProps(nextProps);

    expect(componentWillReceiveProps).toHaveBeenCalledTimes(1);
    expect(componentWillReceiveProps.mock.calls[0][0]).toEqual(expectedProps);
    expect(shouldComponentUpdate).toHaveBeenCalledTimes(1);
    expect(shouldComponentUpdate.mock.calls[0][0]).toEqual(expectedProps);
    expect(shouldComponentUpdate.mock.calls[0][1]).toEqual(null);
    expect(componentWillUpdate).toHaveBeenCalledTimes(1);
    expect(componentWillUpdate.mock.calls[0][0]).toEqual(expectedProps);
    expect(componentWillUpdate.mock.calls[0][1]).toEqual(null);
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
    expect(componentDidUpdate.mock.calls[0][0]).toEqual(oldProps);
    expect(componentDidUpdate.mock.calls[0][1]).toEqual(null);
  });

  test('Updates correctly when component should not update', () => {
    const componentDidUpdate = jest.fn();
    const componentWillReceiveProps = jest.fn();
    const componentWillUpdate = jest.fn();
    const shouldComponentUpdate = jest.fn().mockReturnValue(false);
    const nextProps = {
      next: 'props',
    };
    const wrapper = mount(
      <Lifecycler
        componentDidUpdate={componentDidUpdate}
        componentWillReceiveProps={componentWillReceiveProps}
        componentWillUpdate={componentWillUpdate}
        shouldComponentUpdate={shouldComponentUpdate}
      >
        <Children />
      </Lifecycler>,
    );
    const oldProps = wrapper.instance().props;
    const expectedProps = { ...oldProps, ...nextProps };
    wrapper.setProps(nextProps);

    expect(componentWillReceiveProps).toHaveBeenCalledTimes(1);
    expect(componentWillReceiveProps.mock.calls[0][0]).toEqual(expectedProps);
    expect(shouldComponentUpdate).toHaveBeenCalledTimes(1);
    expect(shouldComponentUpdate.mock.calls[0][0]).toEqual(expectedProps);
    expect(shouldComponentUpdate.mock.calls[0][1]).toEqual(null);
    expect(componentWillUpdate).toHaveBeenCalledTimes(0);
    expect(componentDidUpdate).toHaveBeenCalledTimes(0);
  });

  test('Unmounts correctly', () => {
    const componentWillUnmount = jest.fn();
    const wrapper = mount(
      <Lifecycler componentWillUnmount={componentWillUnmount}>
        <Children />
      </Lifecycler>,
    );
    wrapper.unmount();

    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
  });
});
