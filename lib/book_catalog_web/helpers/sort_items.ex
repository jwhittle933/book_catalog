defmodule BookCatalogWeb.Sort do
  
  def sort_items(list, field) do 
    Enum.sort_by list, &Map.fetch(&1, field)
  end

end