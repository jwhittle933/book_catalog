# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     BookCatalog.Repo.insert!(%BookCatalog.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias BookCatalog.{Book, Repo}

Repo.insert!(%Book{
  category: "Classical Texts",
    date_published: 1920,
    ed: 2,
    isbn: "978-0-19-814556-1",
    page_count: 239,
    publisher: "Oxford",
    series: "Oxford Classical Texts",
    subtitle: nil,
    title: "Xenophontis Operal Omnia ",
    volume: "Tomus V"
})