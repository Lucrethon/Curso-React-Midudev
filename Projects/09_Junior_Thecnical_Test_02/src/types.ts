
export type Results = {
    Search:       Movie[];
    totalResults: string;
    Response:     "True";
}

export type Type = "game" | "movie" | "series";

export type Movie = {
    Title:  string;
    Year:   string;
    imdbID: string;
    Type:   Type;
    Poster: string;
}

export type NoResults = {
  Response: "False",
  Error: "Movie not found!"
}