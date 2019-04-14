defmodule BookCatalogWeb.APIView do
  use BookCatalogWeb, :view

  def render("books.json", %{books: books}) do
    %{
      books: Enum.map(books, &books_json/1)
    }
  end

  def render("book.json", %{book: book}) do
    %{
      book: books_json(book)
    }
  end

  def books_json(book) do
    %{
      id: book.id,
      title: book.title,
      subtitle: book.subtitle,
      author: book.author,
      edition: book.ed,
      volume: book.volume,
      series: book.series,
      category: book.category,
      date_published: book.date_published,
      page_count: book.page_count,
      isbn: book.isbn,
      inserted_at: book.inserted_at,
      updated_at: book.updated_at
    }
  end
end
