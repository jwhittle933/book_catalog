defmodule BookCatalog.Repo.Migrations.AddCategoryToBooks do
  use Ecto.Migration

  def change do
  	alter table("books") do 
  		add :category, :text
  		add :publisher, :text
  	end
  end
end
