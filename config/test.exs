use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :book_catalog, BookCatalogWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :book_catalog, BookCatalog.Repo,
  username: "postgres",
  password: "postgres",
  database: "book_catalog_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
