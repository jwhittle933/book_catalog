defmodule BookCatalogWeb.APIController do
  use BookCatalogWeb, :controller

  alias BookCatalog.{Book, Repo}

  @doc """
    index api func for returning list of books to client
  """
  @spec index(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def index(conn, _params) do
    books = Repo.all(Book)
    render(conn, "index.json", books: books)
  end

  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, %{"id" => book_id} = _params) do
    book = Repo.get(Book, book_id)
    render(conn, "show.json", book: book)
  end

  @spec edit(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def edit(conn, %{"id" => book_id} = _params) do
    book = Repo.get(Book, book_id)
    changeset = Book.changeset(book)
    render(conn, "edit.json", changeset: changeset)
  end

  defp filter(conn, %{"filter" => filter}) do
    #
  end
end
