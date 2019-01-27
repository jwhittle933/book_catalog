defmodule BookCatalogWeb.CatalogController do
  use BookCatalogWeb, :controller

  alias BookCatalog.{Book, Repo}

  def index(conn, _params) do
    books = Repo.all(Book)

    render(conn, "index.html", books: books)
  end

  def new(conn, _params) do
    changeset = Book.changeset(%Book{}, %{})

    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"book" => book}) do
    changeset = Book.changeset(%Book{}, book)

    case Repo.insert(changeset) do
      {:ok, _book} ->
        conn
        |> put_flash(:info, "New Book Added")
        |> redirect(to: Routes.catalog_path(conn, :index))

      {:error, changeset} ->
        conn
        |> put_flash(:error, "There was a problem")
        |> render("new.html", changeset: changeset)
    end
  end

  def edit(conn, %{"id" => book_id}) do
    book = Repo.get(Book, book_id)
    changeset = Book.changeset(book)
    render(conn, "edit.html", changeset: changeset, book: book)
  end

  def update(conn, %{"id" => book_id, "book" => book}) do
    old_book = Repo.get(Book, book_id)
    changeset = Book.changeset(old_book, book)

    case Repo.update(changeset) do
      {:ok, book} ->
        conn
        |> put_flash(:info, "Book updated")
        |> redirect(to: Routes.catalog_path(conn, :index))

      {:error, changeset} ->
        render(conn, "edit.html", changeset: changeset, book: old_book)
    end
  end

  def show(conn, %{"id" => book_id}) do
    book = Repo.get!(Book, book_id)
    render(conn, "show.html", book: book)
  end

  def delete(conn, %{"id" => book_id}) do
    Repo.get!(Book, book_id)
    |> Repo.delete()

    conn
    |> put_flash(:info, "Book Deleted")
    |> redirect(to: Routes.catalog_path(conn, :index))
  end
end
