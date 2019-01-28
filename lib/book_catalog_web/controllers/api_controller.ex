defmodule BookCatalogWeb.APIController do
  use BookCatalogWeb, :controller

  alias BookCatalog.{Book, Repo}

  def index(conn, _params) do
    books = Repo.all(Book)
    render(conn, "index.json", books: books)
  end

  def filter(conn, %{"filter" => filter}) do
    # 
  end
end
