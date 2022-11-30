class Api::V1::ProjectsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_project, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:index, :show]

  # GET /projects or /projects.json
  def index
    if user_signed_in?
      render json: ProjectSerializer.new(current_user.projects).serialized_json
    else
      render json: {}, status: 401
    end
  end

  # GET /projects/1 or /projects/1.json
  def show
    render json: ProjectSerializer.new(@project, options).serialized_json
  end

  # GET /projects/new
  def new
    @project = current_user.projects.build
  end

  # GET /projects/1/edit
  def edit
  end

  # POST /projects or /projects.json
  def create
    @project = current_user.projects.build(project_params)

    if @project.save
      render json: ProjectSerializer.new(@project, options).serialized_json
    else
      render json: {error: @project.errors }, status: 422
    end
  end

  # PATCH/PUT /projects/1 or /projects/1.json
  def update
    if @project.update(project_params)
      render json: ProjectSerializer.new(@project, options).serialized_json
    else
      render json: {error: @project.errors }, status: 422
    end
  end

  # DELETE /projects/1 or /projects/1.json
  def destroy
    if @project.destroy
      head :no_content, notice: "Project was successfully destroyed."
    else
      render json: {error: @project.errors }, status: 422
    end
  end

  private

  def set_project
    @project = Project.find_by(slug: params[:slug])
  end
  def project_params
    params.require(:project).permit(:title, :user_id)
  end

  def options
    @options ||= {include: %i[tasks]}
  end
end
