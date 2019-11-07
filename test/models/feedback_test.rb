require 'test_helper'

class FeedbackTest < ActiveSupport::TestCase
  test 'validates presence of comments and name' do
    feedback = Feedback.new(comments: 'Comments', name: 'Luke')

    assert_predicate feedback, :valid?, 'should be valid'
  end

  test 'comments is required' do
    feedback = Feedback.new(name: 'Luke')

    assert_predicate feedback, :invalid?
  end

  test 'name is required' do
    feedback = Feedback.new(comments: 'Comments')

    assert_predicate feedback, :invalid?
  end
end
