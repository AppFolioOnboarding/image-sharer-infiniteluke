require 'test_helper'

class ImagesControllerTest < ActionDispatch::IntegrationTest
  test 'should get a new page' do
    get new_image_path
    assert_response :ok
    assert_select 'input'
  end

  test 'create redirects to show page' do
    assert_difference('Image.count') do
      post images_path, params: { image: { url: 'https://appfolio.com/image.png' } }
    end
    assert_redirected_to image_path(Image.last)
  end

  test 'show finds respective image' do
    get image_path(Image.create!(url: 'https://appfolio.com/image.png'))
    assert_response :ok
    assert_select 'img[src="https://appfolio.com/image.png"]'
  end
end
