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

  def update
    task = Task.find_by(id: params[:id])

    if task.update(task_params)
      render json: TaskSerializer.new(task).serialized_json
    else
      render json: {error: task.errors.message }, status: 422
    end
  end

  def destroy
    task = Task.find_by(id: params[:id])

    if task.destroy
      head :no_content, notice: "Project was successfully destroyed."
    else
      render json: {error: task.errors.message }, status: 422
    end
  end

  private

  def task_params
    params.require(:task).permit(:id, :project_id, :title, :status, :completed, :due_date, :complexity)
  end

  def project
    @project ||= Project.find(params[:project_id])
  end
end