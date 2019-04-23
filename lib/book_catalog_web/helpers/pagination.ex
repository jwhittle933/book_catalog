defmodule BookCatalogWeb.Pagination do

  alias BookCatalog.Book

  @type book :: %Book{
    author: String.t(), 
    date_published: integer,
    ed: integer, 
    isbn: String.t(), 
    page_count: integer, 
    title: String.t(), 
    subtitle: String.t(), 
    publisher: String.t(), 
    category: String.t(), 
    volume: String.t(), 
    series: String.t()    
  }


  @doc """
    paginate 
  """
  @spec paginate(Book, integer(), integer(), %{optional(String.t()) => [book]}) :: %{required(String.t()) => [book]}
  def paginate(books, page_size, 0, acc) do
    Map.put(acc, Enum.count(acc) + 1, Enum.take(books, page_size))
  end

  @spec paginate(Book, integer(), integer(), %{optional(String.t()) => [book]}) :: %{required(String.t()) => [book]}
  def paginate(books, page_size, total_pages, acc) do
    new_acc = Map.put(acc, Enum.count(acc) + 1, Enum.take(books, page_size))
    paginate(Enum.drop(books, page_size), page_size, total_pages - 1, new_acc)
  end

end