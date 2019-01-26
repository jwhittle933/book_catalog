defmodule BookCatalog.Repo.Migrations.CreateBooks do
  use Ecto.Migration

  def change do
    create table(:books) do
      add :title, :string
      add :author, :string
      add :date_published, :integer
      add :page_count, :integer
      add :ed, :integer
      add :isbn, :string

      timestamps()
    end

  end
end
