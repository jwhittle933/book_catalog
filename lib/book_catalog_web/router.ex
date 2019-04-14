defmodule BookCatalogWeb.Router do
  use BookCatalogWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", BookCatalogWeb do
    pipe_through :browser

    resources "/", CatalogController
  end

  # Other scopes may use custom stacks.
  scope "/api", BookCatalogWeb do
    pipe_through :api

    get "/books", APIController, :index
  end
end
