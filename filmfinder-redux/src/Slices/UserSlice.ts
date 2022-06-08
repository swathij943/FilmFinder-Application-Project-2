import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IMovie } from "../Interfaces/IMovie";
import { IUser } from "../Interfaces/IUser";

interface UserSliceState {
  loading: boolean;
  error: boolean;
  user?: IUser;
}

const initialUserState: UserSliceState = {
  loading: false,
  error: false,
};

type Login = {
    username: string,
    password: string
}

type Register = {
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  email: string
}

// type Update = {
//   userId: number,
//   firstName: string,
//   lastName: string,
//   username: string,
//   password: string,
//   favorites: IMovie[]
// }

type Favorites = {
  userId: number,
  movieId: number,
}

export const loginUser = createAsyncThunk(
    "user/login", 
    async (login: Login, thunkAPI) => {
    try {
      const res = await axios.post(`http://localhost:8000/user/login`, login);
      console.log("User: " + res.data);
      return {
            userId: res.data.userId,
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            username: res.data.username,
            password: res.data.password,
            favorites: res.data.favorites
      };
    } catch (e) {
      console.log(e);
    }
  });

  export const registerUser = createAsyncThunk(
    "user/register", 
    async (register: Register, thunkAPI) => {
    try {
      const res = await axios.post(`http://localhost:8000/user/register`, register);
      console.log("User: " + res.data);
      return {
            userId: res.data.userId,
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            username: res.data.username,
            password: res.data.password,
            favorites: res.data.favorites
      };
    } catch (e) {
      console.log(e);
    }
  });

  export const updateUser = createAsyncThunk(
    "user/update", 
    async (update: IUser, thunkAPI) => {
    try {
      const res = await axios.put(`http://localhost:8000/user/update`, update);
      console.log("User: " + res.data);
      return {
            userId: res.data.userId,
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            username: res.data.username,
            password: res.data.password,
            favorites: res.data.favorites
      };
    } catch (e) {
      console.log(e);
    }
  });

  export const favoriteMovie = createAsyncThunk(
    "user/favorite", 
    async (favs: Favorites, thunkAPI) => {
    try {
      const res = await axios.post(`http://localhost:8000/user/favorite?userId=${favs.userId}&movieId=${favs.movieId}`);
      console.log(res.data);
      return {
        userId: res.data.userId,
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        username: res.data.username,
        password: res.data.password,
        favorites: res.data.favorites
      };
    } catch (e) {
      console.log(e);
    }
  });

  export const removeFavoriteMovie = createAsyncThunk(
    "user/delete", 
    async (favs: Favorites, thunkAPI) => {
    try {
      const res = await axios.delete(`http://localhost:8000/user/delete?userId=${favs.userId}&movieId=${favs.movieId}`);
      console.log(res.data);
      return {
        userId: res.data.userId,
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        username: res.data.username,
        password: res.data.password,
        favorites: res.data.favorites
      };
    } catch (e) {
      console.log(e);
    }
  });

export const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    clearUser: (state) => {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(favoriteMovie.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(favoriteMovie.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(favoriteMovie.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(removeFavoriteMovie.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(removeFavoriteMovie.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(removeFavoriteMovie.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const { clearUser } = UserSlice.actions;

export default UserSlice.reducer;
