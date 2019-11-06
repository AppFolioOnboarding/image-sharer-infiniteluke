require 'test_helper'

class ImagesControllerTest < ActionDispatch::IntegrationTest
  test 'lists images on index in descending order by created_at' do
    Image.create(url: 'https://appfolio.com/image1.png')
    Image.create(url: 'https://appfolio.com/image2.png')
    Image.create(url: 'https://appfolio.com/image3.png')
    get root_path
    assert_response :ok
    assert_select 'section' do
      assert_select 'img', 3
      assert_select 'img' do |elements|
        # Test order of images
        elements.each_with_index do |element, index|
          assert_equal "https://appfolio.com/image#{elements.size - index}.png", element[:src]
        end
      end
    end
  end

  test 'lists tags on a image on index page' do
    tags = ['tag1', 'tag2']
    @image = Image.new(url: 'https://appfolio.com/image1.png')
    @image.tag_list = tags.join(',')
    @image.save

    get root_path
    assert_response :ok
    assert_select '[data-testid="tag"]', tags[0]
    assert_select '[data-testid="tag"]', tags[1]
  end

  test 'shows no images message on index if no images exist' do
    get root_path
    assert_response :ok
    assert_select 'section', 'No images.'
  end

  test 'should get a new page' do
    get new_image_path
    assert_response :ok
    assert_select 'h1', 'New Image'
  end

  test 'create redirects to show page' do
    assert_difference('Image.count') do
      post images_path, params: { image: { url: 'https://appfolio.com/image.png' } }
    end
    assert_redirected_to image_path(Image.last)
  end

  test 'shows new page if errors occur during save' do
    assert_no_difference('Image.count') do
      post images_path, params: { image: { url: 'Invalid!' } }
    end
    assert_select 'h1', 'New Image'
  end

  test 'show finds respective image' do
    tags = ['tag1', 'tag2']
    @image = Image.new(url: 'https://appfolio.com/image.png')
    @image.tag_list = tags.join(',')
    @image.save
    get image_path(@image)
    assert_response :ok
    assert_select 'img[src="https://appfolio.com/image.png"]'
    assert_select '[data-testid="tag"]', tags[0]
    assert_select '[data-testid="tag"]', tags[1]
  end
end
