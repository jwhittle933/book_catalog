defmodule BookCatalog.BooksTest do
  use BookCatalog.DataCase

  alias BookCatalog.Books

  describe "book" do
    alias BookCatalog.Books.Book

    @valid_attrs %{author: "some author", category: "some category", date_published: 42, ed: 42, isbn: 42, page_count: 42, publisher: "some publisher", series: "some series", subtitle: "some subtitle", title: "some title", volume: "some volume"}
    @update_attrs %{author: "some updated author", category: "some updated category", date_published: 43, ed: 43, isbn: 43, page_count: 43, publisher: "some updated publisher", series: "some updated series", subtitle: "some updated subtitle", title: "some updated title", volume: "some updated volume"}
    @invalid_attrs %{author: nil, category: nil, date_published: nil, ed: nil, isbn: nil, page_count: nil, publisher: nil, series: nil, subtitle: nil, title: nil, volume: nil}

    def book_fixture(attrs \\ %{}) do
      {:ok, book} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Books.create_book()

      book
    end

    test "list_book/0 returns all book" do
      book = book_fixture()
      assert Books.list_book() == [book]
    end

    test "get_book!/1 returns the book with given id" do
      book = book_fixture()
      assert Books.get_book!(book.id) == book
    end

    test "create_book/1 with valid data creates a book" do
      assert {:ok, %Book{} = book} = Books.create_book(@valid_attrs)
      assert book.author == "some author"
      assert book.category == "some category"
      assert book.date_published == 42
      assert book.ed == 42
      assert book.isbn == 42
      assert book.page_count == 42
      assert book.publisher == "some publisher"
      assert book.series == "some series"
      assert book.subtitle == "some subtitle"
      assert book.title == "some title"
      assert book.volume == "some volume"
    end

    test "create_book/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Books.create_book(@invalid_attrs)
    end

    test "update_book/2 with valid data updates the book" do
      book = book_fixture()
      assert {:ok, %Book{} = book} = Books.update_book(book, @update_attrs)
      assert book.author == "some updated author"
      assert book.category == "some updated category"
      assert book.date_published == 43
      assert book.ed == 43
      assert book.isbn == 43
      assert book.page_count == 43
      assert book.publisher == "some updated publisher"
      assert book.series == "some updated series"
      assert book.subtitle == "some updated subtitle"
      assert book.title == "some updated title"
      assert book.volume == "some updated volume"
    end

    test "update_book/2 with invalid data returns error changeset" do
      book = book_fixture()
      assert {:error, %Ecto.Changeset{}} = Books.update_book(book, @invalid_attrs)
      assert book == Books.get_book!(book.id)
    end

    test "delete_book/1 deletes the book" do
      book = book_fixture()
      assert {:ok, %Book{}} = Books.delete_book(book)
      assert_raise Ecto.NoResultsError, fn -> Books.get_book!(book.id) end
    end

    test "change_book/1 returns a book changeset" do
      book = book_fixture()
      assert %Ecto.Changeset{} = Books.change_book(book)
    end
  end
end
