defmodule BookCatalog.Repo.Migrations.AddSubtitleToBooks do
  use Ecto.Migration

  def change do
  	alter table("books") do 
  		add :subtitle, :text
  	end
  end
end
