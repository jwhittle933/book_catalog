defmodule BookCatalog.Repo.Migrations.AddSeriesToBooks do
  use Ecto.Migration

  def change do
  	alter table("books") do 
  		add :series, :text
  	end
  end
end
