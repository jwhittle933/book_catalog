defmodule BookCatalogWeb.PageController do
  use BookCatalogWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
