defmodule BookCatalog.Repo.Migrations.AddVolumeToBooksTable do
  use Ecto.Migration

  def change do
  	alter table("books") do 
  		add :volume, :text
  	end
  end
end
