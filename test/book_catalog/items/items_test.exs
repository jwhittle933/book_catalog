defmodule BookCatalog.ItemsTest do
  use BookCatalog.DataCase

  alias BookCatalog.Items

  describe "movies" do
    alias BookCatalog.Items.Movie

    @valid_attrs %{" ": "some  ", director: "some director", title: "some title", year: 42}
    @update_attrs %{" ": "some updated  ", director: "some updated director", title: "some updated title", year: 43}
    @invalid_attrs %{" ": nil, director: nil, title: nil, year: nil}

    def movie_fixture(attrs \\ %{}) do
      {:ok, movie} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Items.create_movie()

      movie
    end

    test "list_movies/0 returns all movies" do
      movie = movie_fixture()
      assert Items.list_movies() == [movie]
    end

    test "get_movie!/1 returns the movie with given id" do
      movie = movie_fixture()
      assert Items.get_movie!(movie.id) == movie
    end

    test "create_movie/1 with valid data creates a movie" do
      assert {:ok, %Movie{} = movie} = Items.create_movie(@valid_attrs)
      assert movie.  == "some  "
      assert movie.director == "some director"
      assert movie.title == "some title"
      assert movie.year == 42
    end

    test "create_movie/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Items.create_movie(@invalid_attrs)
    end

    test "update_movie/2 with valid data updates the movie" do
      movie = movie_fixture()
      assert {:ok, %Movie{} = movie} = Items.update_movie(movie, @update_attrs)
      assert movie.  == "some updated  "
      assert movie.director == "some updated director"
      assert movie.title == "some updated title"
      assert movie.year == 43
    end

    test "update_movie/2 with invalid data returns error changeset" do
      movie = movie_fixture()
      assert {:error, %Ecto.Changeset{}} = Items.update_movie(movie, @invalid_attrs)
      assert movie == Items.get_movie!(movie.id)
    end

    test "delete_movie/1 deletes the movie" do
      movie = movie_fixture()
      assert {:ok, %Movie{}} = Items.delete_movie(movie)
      assert_raise Ecto.NoResultsError, fn -> Items.get_movie!(movie.id) end
    end

    test "change_movie/1 returns a movie changeset" do
      movie = movie_fixture()
      assert %Ecto.Changeset{} = Items.change_movie(movie)
    end
  end
end
