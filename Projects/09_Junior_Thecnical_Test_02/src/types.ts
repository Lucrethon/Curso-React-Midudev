
export type Results = {
    Search:       Movie[];
    totalResults: string;
    Response:     string;
}

export type Type = {
    Game : "game",
    Movie : "movie",
}


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