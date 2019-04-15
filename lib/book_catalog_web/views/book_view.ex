defmodule BookCatalogWeb.BookView do
  use BookCatalogWeb, :view
  alias BookCatalogWeb.BookView

  def render("index.json", %{book: book}) do
    %{data: render_many(book, BookView, "book.json")}
  end

  def render("show.json", %{book: book}) do
    %{data: render_one(book, BookView, "book.json")}
  end

  def render("book.json", %{book: book}) do
    %{id: book.id,
      author: book.author,
      date_published: book.date_published,
      ed: book.ed,
      isbn: book.isbn,
      page_count: book.page_count,
      title: book.title,
      subtitle: book.subtitle,
      publisher: book.publisher,
      category: book.category,
      volume: book.volume,
      series: book.series}
  end
end
