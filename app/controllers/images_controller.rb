class ImagesController < ApplicationController
  def index
    @images = Image
      .includes(:tags)
      .order(created_at: :desc)
      .yield_self do |images|
        params[:tag].present? ? images.tagged_with(params[:tag]) : images
      end
      .all
  end

  def new
    @image = Image.new
  end

  def create
    @image = Image.new(image_params)

    if @image.save
      redirect_to @image
    else
      render 'new'
    end
  end

  def show
    @image = Image.find(params[:id])
  end

  private

  def image_params
    params.require(:image).permit(:url, :tag_list)
  end
end
