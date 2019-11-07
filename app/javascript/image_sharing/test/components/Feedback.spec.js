/* eslint-env mocha */

import assert from 'assert';
import { shallow } from 'enzyme';
import React from 'react';
import Feedback from '../../components/Feedback';

describe('<Feedback />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Feedback />);
    assert.strictEqual(wrapper.type(), 'form');
    const labels = wrapper.find('label');
    assert.strictEqual(labels.at(0).text(), 'Your Name:');
    assert.strictEqual(labels.at(1).text(), 'Comments:');
  });
});
