defmodule BookCatalogWeb.APIView do
  use BookCatalogWeb, :view

  def render("index.json", %{books: books}) do
    %{
      books: Enum.map(books, &books_json/1)
    }
  end

  def render("show.json", %{book: book}) do
    %{
      book: books_json(book)
    }
  end

  def books_json(book) do
    %{
      id: book.id,
      title: book.title,
      author: book.author,
      edition: book.ed,
      date_published: book.date_published,
      page_count: book.page_count,
      isbn: book.isbn,
      inserted_at: book.inserted_at,
      updated_at: book.updated_at
    }
  end
end