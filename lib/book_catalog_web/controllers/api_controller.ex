defmodule BookCatalogWeb.APIController do
  use BookCatalogWeb, :controller

  import Plug.Conn
  alias BookCatalog.{Book, Repo}

  @doc """
    index api func for returning list of item to client
    render func renders items.json view defined api_view.ex
  """
  @spec index(Plug.Conn.t(), any()) :: Plug.Conn.t()
  def index(conn, _params) do
    books = Repo.all(Book)
    page_size = conn.query_params["page_size"]
    total_pages = Enum.count(books)
    
  
    json conn, books

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

  @doc """
    apply_pages
  """

  def apply_pages(books, page_size, 0, current_page, acc) do
    Map.put(acc, "page#{current_page}", Enum.take(books, page_size))
  end

  def apply_pages(books, page_size, total_pages, current_page, acc) do
    new_acc = Map.put(acc, "page#{current_page}", Enum.take(books, page_size))
    
    apply_pages(Enum.drop(books, page_size), page_size, total_pages - 1, current_page + 1, new_acc)
  end

  @exceptions [NaiveDateTime, DateTime]
  @bloat [:__meta__, :__struct__, :__cardinality__, :__field__,  :__owner__]
  
  defp strip_meta(list) when is_list(list) do
    Enum.map(list, &strip_meta/1)
  end
  
  defp strip_meta(schema) when is_map(schema) do
    Map.take(schema, Map.keys(schema) -- @bloat)
    |> Enum.map(&strip_meta/1) 
    |> Enum.into(%{})
  end

  defp strip_meta({key, %{__struct__: struct} = val})
    when struct in @exceptions, do: {key, val}

  defp strip_meta({key, val}) when is_map(val) or is_list(val) do
    {key, strip_meta(val)}
  end

end
