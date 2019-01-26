defmodule BookCatalogWeb.CatalogController do
  use BookCatalogWeb, :controller

  alias BookCatalog.{Book, Repo}

  def index(conn, _params) do
    books = Repo.all(Book)

    render(conn, "index.html", books: books)
  end

  def edit(conn, _params) do
  end

  def new(conn, _params) do
    changeset = Book.changeset(%Book{}, %{})

    render(conn, "new.html", changeset: changeset)
  end

  def show(conn, %{"id" => book_id}) do
    book = Repo.get!(Book, book_id)
    render(conn, "show.html", book: book)
  end

  def create(conn, %{"book" => book} = params) do
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

  def update(conn, _params) do
  end

  def delete(conn, %{"id" => book_id}) do
    Repo.get!(Book, book_id)
    |> Repo.delete()

    conn
    |> put_flash(:info, "Book Deleted")
    |> redirect(to: Routes.catalog_path(conn, :index))
  end
end
