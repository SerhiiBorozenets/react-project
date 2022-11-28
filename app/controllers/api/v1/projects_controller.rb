class Api::V1::ProjectsController < ApplicationController
  protect_from_forgery with: :null_session

  # GET /projects or /projects.json
  def index
    projects = Project.all

    render json: ProjectSerializer.new(projects).serialized_json
  end

  # GET /projects/1 or /projects/1.json
  def show
    project = Project.find_by(slug: params[:slug])

    render json: ProjectSerializer.new(project, options).serialized_json
  end

  # GET /projects/new
  def new
    @project = Project.new
  end

  # GET /projects/1/edit
  def edit
  end

  # POST /projects or /projects.json
  def create
    project = Project.new(project_params)

    if project.save
      render json: ProjectSerializer.new(project, options).serialized_json
    else
      render json: {error: project.errors.message }, status: 422
    end
  end

  # PATCH/PUT /projects/1 or /projects/1.json
  def update
    project = Project.find_by(slug: params[:slug])

    if project.update(project_params)
      render json: ProjectSerializer.new(project, options).serialized_json
    else
      render json: {error: project.errors.message }, status: 422
    end
  end

  # DELETE /projects/1 or /projects/1.json
  def destroy
    project = Project.find_by(slug: params[:slug])
    if project.destroy
      head :no_content, notice: "Project was successfully destroyed."
    else
      render json: {error: project.errors.message }, status: 422
    end
  end

  private
  def project_params
    params.require(:project).permit(:title, :user_id)
  end

  def options
    @options ||= {include: %i[tasks]}
  end
end
