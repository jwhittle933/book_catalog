defmodule BookCatalog.Repo do
  use Ecto.Repo,
    otp_app: :book_catalog,
    adapter: Ecto.Adapters.Postgres
end
