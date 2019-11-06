class Image < ApplicationRecord
  acts_as_taggable
  validates :url, format: URI.regexp(%w[http https])
end
