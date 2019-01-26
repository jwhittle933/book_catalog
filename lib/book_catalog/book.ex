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

    timestamps()
  end

  @doc false
  def changeset(book, attrs \\ %{}) do
    book
    |> cast(attrs, [:title, :author, :date_published, :page_count, :ed, :isbn])
    |> validate_required([:title, :author, :date_published, :page_count, :ed, :isbn])
  end
end
