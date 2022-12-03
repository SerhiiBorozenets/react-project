module Users
  class CreateExampleProject
    require 'faker'
    COMPLEXITY = %w[None Elementary Intermediate Advanced Master]
    STATUS = %w[No Low Middle High]

    def process(user_id)
      project = Project.create({ title: "Example Project (you can remove it!!!)", user_id: user_id })
      create_tasks(project.id)
    end

    private

    def create_tasks(project_id)
      10.times do
        Task.create({
                      project_id: project_id,
                      title: Faker::Hobby.activity,
                      due_date: Faker::Date.forward(days: 30).to_s,
                      status: STATUS.sample,
                      complexity:  COMPLEXITY.sample,
                      completed: Faker::Boolean.boolean
                    })
      end
    end
  end
end
