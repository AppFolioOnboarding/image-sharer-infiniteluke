require 'test_helper'

class ImageTest < ActiveSupport::TestCase
  test 'validates url' do
    image = Image.new(url: 'notAURL')
    assert_predicate image, :invalid?
    assert_includes image.errors.messages[:url], 'is invalid'
  end

  test 'url is required' do
    image = Image.new(url: nil)
    assert_predicate image, :invalid?
    assert_includes image.errors.messages[:url], 'is invalid'
  end

  test 'image is instantiated' do
    image = Image.new(url: 'https://appfolio.com/image.png')
    assert_predicate image, :valid?
  end
end
