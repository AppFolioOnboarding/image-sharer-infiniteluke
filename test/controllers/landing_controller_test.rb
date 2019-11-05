require 'test_helper'

class LandingControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get root_path
    assert_response :success
    assert_select 'h1', 'Hello World'
  end

end
