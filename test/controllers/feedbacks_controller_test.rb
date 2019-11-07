require 'test_helper'

class FeedbacksControllerTest < ActionDispatch::IntegrationTest
  test 'create should return the feedback on success' do
    assert_difference('Feedback.count') do
      post api_feedbacks_path, params: { feedback: { name: 'Luke', comments: 'Comments' } }
    end

    assert_response :created
    assert_equal(
      { 'data' => { 'id' => 1, 'name' => 'Luke', 'comments' => 'Comments' } },
      JSON.parse(response.body)
    )
  end

  test 'create should return an error when a Feedback cannot be created' do
    assert_no_difference('Feedback.count') do
      post api_feedbacks_path, params: { feedback: { comments: 'Comments' } }
    end

    assert_response :unprocessable_entity
    assert_equal({ 'errors' => { 'name' => ['can\'t be blank'] } }, JSON.parse(response.body))
  end
end
