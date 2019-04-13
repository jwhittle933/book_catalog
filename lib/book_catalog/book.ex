defmodule BookCatalog.Book do
  use Ecto.Schema
  import Ecto.Changeset

  schema "books" do
    field :author, :string
    field :date_published, :integer
    field :ed, :integer
    field :isbn, :string
    field :page_count, :integer
    field :title, :string
    field :subtitle, :string
    field :publisher, :string
    field :category, :string
    field :volume, :string
    field :series, :string
    timestamps()
  end

  @doc false
  def changeset(book, attrs \\ %{}) do
    book
    |> cast(attrs, [
      :title,
      :subtitle,
      :author,
      :ed,
      :series,
      :volume,
      :date_published,
      :publisher,
      :category,
      :isbn,
      :page_count
    ])
    |> validate_required([
      :title,
      :author,
      :date_published,
      :page_count,
      :isbn,
      :publisher,
      :category
    ])
  end
end
