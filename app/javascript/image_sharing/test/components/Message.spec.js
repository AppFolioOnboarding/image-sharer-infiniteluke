/* eslint-env mocha */

import assert from 'assert';
import { shallow } from 'enzyme';
import React from 'react';
import Message from '../../components/Message';

describe('<Message />', () => {
  it('should show a success message by default', () => {
    const wrapper = shallow(<Message message="Success!" />);
    assert.strictEqual(wrapper.type(), 'div');
    assert.strictEqual(wrapper.find('.alert-success').text(), 'Success!');
  });

  it('should show a error message when type is "error"', () => {
    const wrapper = shallow(<Message message="Fail!" type="error" />);
    assert.strictEqual(wrapper.type(), 'div');
    assert.strictEqual(wrapper.find('.alert-danger').text(), 'Fail!');
  });

  it('passes className through to message wrapper element', () => {
    const wrapper = shallow(<Message message="Success!" className="mt-5" />);
    assert.strictEqual(wrapper.find('.alert-success.mt-5').text(), 'Success!');
  });
});
