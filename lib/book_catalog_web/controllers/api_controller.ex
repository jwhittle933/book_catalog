defmodule BookCatalogWeb.APIController do
  use BookCatalogWeb, :controller

  alias BookCatalog.{Book, Repo}

  @doc """
    index api func for returning list of item to client
    render func renders items.json view defined api_view.ex
  """
  @spec index(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def index(conn, _params) do
    books = Repo.all(Book)
    page_size = conn.query_params["page_size"]
    paginated_books = Enum.take(books, String.to_integer(page_size))

    render(conn, "items.json", books: paginated_books)
  end

  @doc """
    show api func for returning sinlge item to client
    render func renders item.json view defined api_view.ex
  """
  @spec show(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def show(conn, %{"id" => book_id} = _params) do
    book = Repo.get(Book, book_id)
    render(conn, "item.json", book: book)
  end

  @doc """
    edit api func for updating sinlge item from the client
    render func renders item.json view defined api_view.ex
  """
  @spec edit(Plug.Conn.t(), map()) :: Plug.Conn.t()
  def edit(conn, %{"id" => book_id} = _params) do
    book = Repo.get(Book, book_id)
    changeset = Book.changeset(book)
    render(conn, "item.json", changeset: changeset)
  end

  defp paginate(books, page_size) do
    total_books = Enum.count(books)
    total_pages = Integer.floor_div(total_books, page_size) + 1

    Enum.take(books, page_size)
  end

  defp apply_pages(books, per_page, pages_remaining, acc) when pages_remaining < 1 do
    books
  end

  defp apply_pages(books, per_page, pages_remaining, acc) do
    new_pages_remaining = pages_remaining - 1
    current_page = pages_remaining - new_pages_remaining
    new_acc = Map.put(acc, "page#{current_page}", Enum.take(books, per_page))

    apply_pages(Enum.drop(books, per_page), per_page, new_pages_remaining, new_acc)
  end
end
