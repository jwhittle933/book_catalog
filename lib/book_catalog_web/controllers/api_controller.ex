defmodule BookCatalogWeb.APIController do
  use BookCatalogWeb, :controller

  alias BookCatalog.{Book, Repo}

  @doc """
    index api func for returning list of books to client
  """
  @spec index(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def index(conn, _params) do
    books = Repo.all(Book)
    render(conn, "books.json", books: books)
  end

  def filter(conn, %{"filter" => filter}) do
    #
  end
end
