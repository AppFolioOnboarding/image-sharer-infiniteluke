/* eslint-env mocha */

import assert from 'assert';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import Feedback from '../../components/Feedback';
import Message from '../../components/Message';
import * as helper from '../../utils/helper';

describe('<Feedback />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Feedback />);
    assert.strictEqual(wrapper.type(), 'form');
    const labels = wrapper.find('label');
    assert.strictEqual(labels.at(0).text(), 'Your Name:');
    assert.strictEqual(labels.at(1).text(), 'Comments:');
    assert.equal(wrapper.find(Message).length, 0);
  });

  it('should show a success message after posting feedback', (done) => {
    const postStub = sinon.stub(helper, 'post').resolves();
    const wrapper = shallow(<Feedback />);
    wrapper.find('input#name').simulate('change', { target: { value: 'Luke', id: 'name' } });
    wrapper
      .find('textarea#comments')
      .simulate('change', { target: { value: 'Great app!', id: 'comments' } });

    wrapper
      .find('form')
      .simulate(
        'submit',
        {
          preventDefault: () => {},
          persist: () => {}
        }
      );

    setTimeout(() => {
      const expected = ['/api/feedbacks', { name: 'Luke', comments: 'Great app!' }];
      const actual = postStub.getCalls()[0].args;

      assert(
        postStub.calledOnceWithExactly(...expected),
        `Expected to be called with
      ${JSON.stringify(expected, null, 2)}
      Actually called with
      ${JSON.stringify(actual, null, 2)}`
      );

      assert.equal(wrapper.find('input#name').prop('value'), '');
      assert.equal(wrapper.find('textarea#comments').prop('value'), '');

      assert.equal(wrapper.find(Message).prop('message'), 'Thank you for your feedback!');
      postStub.restore();
      done();
    }, 0);
  });

  it('should show error messages if posting feedback yields errors', (done) => {
    const postStub = sinon
      .stub(helper, 'post')
      .rejects({
        data: { errors: { name: ['cannot be blank'], comments: ['cannot be blank'] } }
      });
    const wrapper = shallow(<Feedback />);
    wrapper
      .find('form')
      .simulate(
        'submit',
        {
          preventDefault: () => {},
          persist: () => {}
        }
      );

    setTimeout(() => {
      assert.equal(wrapper.find(Message).length, 2);
      assert.equal(wrapper.find(Message).at(0).prop('type'), 'error');
      assert.equal(wrapper.find(Message).at(0).prop('message'), 'name cannot be blank');
      assert.equal(wrapper.find(Message).at(1).prop('type'), 'error');
      assert.equal(wrapper.find(Message).at(1).prop('message'), 'comments cannot be blank');
      postStub.restore();
      done();
    }, 0);
  });
});
