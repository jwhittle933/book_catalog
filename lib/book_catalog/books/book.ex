defmodule BookCatalog.Books.Book do
  use Ecto.Schema
  import Ecto.Changeset


  schema "book" do
    field :author, :string
    field :category, :string
    field :date_published, :integer
    field :ed, :integer
    field :isbn, :integer
    field :page_count, :integer
    field :publisher, :string
    field :series, :string
    field :subtitle, :string
    field :title, :string
    field :volume, :string

    timestamps()
  end

  @doc false
  def changeset(book, attrs) do
    book
    |> cast(attrs, [:author, :date_published, :ed, :isbn, :page_count, :title, :subtitle, :publisher, :category, :volume, :series])
    |> validate_required([:author, :date_published, :ed, :isbn, :page_count, :title, :subtitle, :publisher, :category, :volume, :series])
  end
end
