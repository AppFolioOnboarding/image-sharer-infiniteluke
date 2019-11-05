class ImagesController < ApplicationController
  def new
    @image = Image.new
  end

  def create
    img = Image.create(image_params)
    redirect_to img
  end

  def show
    @image = Image.find(params[:id])
  end

  private
    def image_params
      params.require(:image).permit(:url)
    end
end
