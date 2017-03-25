import React from 'react';
import { shallow } from 'enzyme';
import ReactTestUtils from 'react-addons-test-utils' // ES6
import AddEvent from './AddEvent';

describe('Component: AddEvent', () => {
  const props = {};

  beforeEach(() => {
    props.event = {};
  });

  it('rejects an improperly-formatted email address', () => {
    //const submitCallback = jest.fn();
    const wrapper = shallow(<AddEvent />);
    //const eventNameInput = wrapper.find('input[name="eventName"]');
    const emailInput = wrapper.find('input[name="email"]');
    emailInput.value = 'email@testdomain';
    console.log('emailInput.value'. emailInput.value);
    ReactTestUtils.Simulate.change(emailInput);

    const emailErrMsg = wrapper.find('#email-err');
    //const eventLinkInput = wrapper.find('input[name="eventLink"]');
    //const submitBtn = wrapper.find('input[type="submit"]');
    //eventNameInput.simulate('change', { target: { value: 'Event Name Test' } });
    //ReactTestUtils.Simulate('change', { target: { value: 'email@testdomain' } });
    //wrapper.update();
    console.log('here', emailErrMsg.text());
    expect(emailErrMsg.text()).toMatch(/[A-Za-z]/);
    //eventLinkInput.simulate('change', { target: { value: 'http://www.google.com' } });
    //submitBtn.simulate('click');
    //expect(wrapper.update().state('submitted')).toBe(null);
    //console.log("emailErr.text()", emailErr.text());
    // //submitBtn.simulate('click');
    //expect(emailErr.text()).toEqual('You must enter a valid email.');

  });

  it('renders without crashing', () => {
    const wrapper = shallow(<AddEvent {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
