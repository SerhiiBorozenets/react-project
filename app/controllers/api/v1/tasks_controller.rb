class Api::V1::TasksController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    task = project.tasks.new(task_params)

    if task.save
      render json: TaskSerializer.new(task).serialized_json
    else
      render json: {error: task.errors.message }, status: 422
    end
  end

  def destroy
    task = Task.find(params[:id])

    if task.destroy
      head :no_connect, notice: "Project was successfully destroyed."
    else
      render json: {error: task.errors.message }, status: 422
    end
  end

  private

  def task_params
    params.require(:task).permit(:name, :status, :completed, :deadline)
  end

  def project
    @project ||= Project.find(params[:project_id])
  end
end