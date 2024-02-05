import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from "../../common/apis/MovieApi";
import { APIKey } from "../../common/apis/MovieApiKey";
export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    // const movieText = "Harry";

    const response = await MovieApi.get(
      `?apikey=${APIKey}&s=${term}&type=movie`
    );
    return response.data;
    //   console.log("this response", response.data);
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    // const seriesText = "Friends";
    const response = await MovieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=series`
    );
    return response.data;
  }
);
export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await MovieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
  loading: false,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
    fetchMoviesLoading: (state) => {
      state.loading = true;
    },
    fetchShowsLoading: (state) => {
      state.loading = true;
    },
    fetchMoviesAndShowsLoading: (state) => {
      state.loading = true;
    },
    fetchMoviesAndShowsSuccess: (state) => {
      state.loading = false;
    },
    fetchMoviesAndShowsError: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        console.log("Pending");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("Fetching Successfully!");
        state.movies = payload;
      })
      .addCase(fetchAsyncMovies.rejected, (state) => {
        console.log("Fetching Rejected!");
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        console.log("Fetching Successfully!");
        state.shows = payload;
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        console.log("Fetching Successfully!");
        state.selectedMovieOrShow = payload;
      });
  },
});

export const {
  removeSelectedMovieOrShow,
  fetchMoviesLoading,
  fetchShowsLoading,
  fetchMoviesAndShowsLoading,
  fetchMoviesAndShowsSuccess,
  fetchMoviesAndShowsError,
} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow;
export const getLoadingState = (state) => state.movies.loading;
export default movieSlice.reducer;
