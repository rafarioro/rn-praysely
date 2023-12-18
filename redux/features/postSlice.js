import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../apiHeaders';

const initialState = {

    viewPosts: 'You',

    yourPosts: [],
    churchPosts: [],

    getPostsLoading: false,
    getPostsSuccess: false,
    getPostsError: false,

    createPostLoading: false,
    createPostSuccess: false,
    createPostError: false,

    errorMessage: '',

}


export const getPosts = createAsyncThunk('posts/getPosts', async (data) => { 

    const response = await axios.post('https://api.praysely.com/api/posts/getPosts', data, config(data.token))

    return response.data

});



  const postSlice = createSlice({
    name: 'post',

    initialState, 

    reducers: {
      setViewPosts: (state, action) => {
        state.viewPosts = action.payload;
      },
    },  
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state, action) => {
                state.getPostsLoading = true;
                state.getPostsSuccess = false;
                state.getPostsError = false;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.getPostsLoading = false;
                state.getPostsSuccess = true; 

                if(state.viewPosts === 'You') {
                    state.yourPosts = action.payload.posts
                } else {
                    state.churchPosts = action.payload.posts
                }
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.getPostsLoading = false;
                state.getPostsError = true;
                state.errorMessage = action.error.message;
            })
        }

  });
 
  export const { setViewPosts } = postSlice.actions;
  
  export default postSlice.reducer;