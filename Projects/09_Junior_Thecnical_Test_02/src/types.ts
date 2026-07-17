
export type Welcome = {
    Search:       Search[];
    totalResults: string;
    Response:     string;
}

export type Type = {
    Game : "game",
    Movie : "movie",
}


export type Search = {
    Title:  string;
    Year:   string;
    imdbID: string;
    Type:   Type;
    Poster: string;
}

export type MovieNotFound = {
  Response: "False",
  Error: "Movie not found!"
}