defmodule BookCatalogWeb.BookController do
  use BookCatalogWeb, :controller

  alias BookCatalog.{Book, Repo}
  alias BookCatalogWeb.Pagination

  @doc """
    index api func for returning list of item to client
  """
  def index(conn, %{"page_size" => page, "page_number" => page_number}) do
    books = Repo.all(Book) |> sort_items(:title)
    total = Enum.count(books)
    page_size = page |> String.to_integer
    number = page_number |> String.to_integer 
    total_pages = total |> Integer.floor_div(page_size) |> (fn x -> x + 1 end).() 
    
    book_list = Pagination.paginate(books, page_size, total_pages, %{})
    |> Map.get(number)

    json conn, %{
      books: book_list,
      page_count: total_pages,
      total_books: total
    }
  end

  def index(conn, %{"page_size" => page}) do
    books = Repo.all(Book)

    page_size = page |> String.to_integer
    total_pages = Enum.count(books) |> Integer.floor_div(page_size) |> (fn x -> x + 1 end).() 
    
    bookList = Pagination.paginate(books, page_size, total_pages, %{})
  
    json conn, %{books: bookList[1]} # temp response to populate UI
  end

  def index(conn, _params) do
    books = Repo.all(Book) |> sort_items(:title)
    total = Enum.count(books)
    json conn, %{books: books, total_books: total}
  end

  @doc """
    show api func for returning sinlge item to client
  """
  def show(conn, %{"id" => book_id} = _params) do
    book = Repo.get!(Book, book_id)

    json conn, book
  end

  @doc """
    edit api func for updating sinlge item from the client
  """
  def edit(conn, %{"id" => book_id} = _params) do
    book = Repo.get(Book, book_id)
    changeset = Book.changeset(book)
    render(conn, "item.json", changeset: changeset)
  end

  defp sort_items(list, field) do 
    Enum.sort_by list, &Map.fetch(&1, field)
  end

end
