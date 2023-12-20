import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../apiHeaders';

const initialState = {

    viewPosts: 'You',
    
    viewSinglePost: false,
    singlePostData: {},

    yourPosts: [],
    churchPosts: [],

    getPostsLoading: false,
    getPostsSuccess: false,
    getPostsError: false,

    createPostLoading: false,
    createPostSuccess: false,
    createPostError: false,

    likePostLoading: false,
    likedPostId: '',
    likePostLoadingId: '',
    likePostSuccess: false,
    likePostError: false,
    likePostErrorMessage: '',
    errorMessage: '',
    isUnlikedId: '',

    //caching 
    lastRenderTimeYours: 0, 
    lastRenderTimeChurch: 0
  

}


export const getPosts = createAsyncThunk('posts/getPosts', async (data) => { 
    const response = await axios.post('https://api.praysely.com/api/posts/getPosts', data, config(data.token))
    return response.data
});

export const likePost = createAsyncThunk('posts/likePost', async (data) => {
    const response = await axios.post('https://api.praysely.com/api/posts/like', data, config(data.token))

    console.log(response.status)

    return response.data
});


  const postSlice = createSlice({
    name: 'post',

    initialState, 

    reducers: {
        setViewPosts: (state, action) => { state.viewPosts = action.payload; },
        setLikeLoading: (state, action) => { state.likePostLoadingId = action.payload; },
        setViewSinglePost: (state, action) => { 

            state.viewSinglePost = action.payload.viewSinglePost
            state.singlePostData = action.payload.singlePostData
                 
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
                    state.lastRenderTimeYours = Date.now()
                } else {
                    state.churchPosts = action.payload.posts
                    state.lastRenderTimeChurch = Date.now()
                }
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.getPostsLoading = false;
                state.getPostsError = true;
                state.errorMessage = action.error.message;
            })
            // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            .addCase(likePost.pending, (state, action) => {
                state.likePostLoading = true;
                state.likePostSuccess = false;
                state.likePostError = false;
                state.likePostErrorMessage = '';
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.likePostLoading = false;
                state.likePostSuccess = true; 
                state.isUnlikedId = action.payload.isUnliked

                if(state.viewPosts === 'You') {
                    state.yourPosts[Number(action.payload.index)] = action.payload.updatedPost
                    state.likedPostId = action.payload.updatedPost._id
                } else {
                    state.churchPosts[Number(action.payload.index)] = action.payload.updatedPost
                    state.likedPostId = action.payload.updatedPost._id
                }
                state.likePostLoadingId = ''

            })
            .addCase(likePost.rejected, (state, action) => {
                state.likePostLoading = false;
                state.likePostError = true;
                state.likePostSuccess = false;
                state.likedPostId = '';
                state.likePostLoadingId = '';
                state.likePostErrorMessage = action.error.message;
            })

        }

  });
 
  export const { setViewPosts, setLikeLoading, setViewSinglePost } = postSlice.actions;
  
  export default postSlice.reducer;