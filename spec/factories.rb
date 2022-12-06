FactoryBot.define do
  factory(:user) do
    email { Faker::Internet.email }
    password { Faker::Internet.password(min_length: 6, max_length: 128) }
  end

  factory(:project) do
    title { Faker::Hobby.activity }
  end

  factory(:task) do
    title { Faker::Hobby.activity }
    due_date { Faker::Date.forward(days: 30).to_s }
    status { %w[No Low Middle High].sample }
    complexity { %w[None Elementary Intermediate Advanced Master].sample }
    completed { Faker::Boolean.boolean }
  end
end
