class Api::V1::ProjectsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_project, only: [:show, :edit, :destroy]
  before_action :authenticate_user!, except: [:index, :show]

  # GET /projects or /projects.json
  def index
    if user_signed_in?
      respond_to do |format|
        format.json do
          render json: ProjectSerializer.new(current_user.projects).serialized_json
        end

        format.zip do
          respond_with_zipped_projects
        end
      end

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
    @project = Project.find_by(slug: params.dig("project", "slug"))
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

  def respond_with_zipped_projects
    compressed_filestream = Zip::OutputStream.write_buffer do |zos|
      current_user.projects.each do |project|
        zos.put_next_entry "#{project.title.truncate(20)}.xlsx"
        zos.print render_to_string(
          layout: false, handlers: [:axlsx], formats: [:xlsx],
          template: 'api/v1/project',
          locals: {project: project}
        )
      end
    end
    compressed_filestream.rewind
    send_data compressed_filestream.read, filename: 'projects.zip'
  end

  def set_project
    @project = Project.find_by(slug: params[:slug])
  end
  def project_params
    params.require(:project).permit(:title, :user_id, :image, :slug)
  end

  def options
    @options ||= {include: %i[tasks]}
  end
end
