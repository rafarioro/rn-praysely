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

    comments: [],

    // should also be for replies
    viewCommentModal: false,
    commentModalData: {},

    getCommentsLoading: false,  
    getCommentsSuccess: false,
    getCommentsError: false,

    singlePostLoading: false,
    singlePostSuccess: false,
    singlePostError: false,

    setCommentLoading: false,
    setCommentSuccess: false,
    setCommentError: false,

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

export const getPostComments = createAsyncThunk('posts/getPostComments', async (data) => {
    const response = await axios.post('https://api.praysely.com/api/singlePost/getComments', data, config(data.token))

    console.log(response.data)

    return response.data
});

export const setSinglePostComment = createAsyncThunk('posts/setComment', async (data) => {
    const response = await axios.post('https://api.praysely.com/api/singlePost/setComment', data, config(data.token))
    console.log(response.data)
    return response.data
});


export const getSinglePost = createAsyncThunk('posts/getSinglePost', async (data) => {
    const response = await axios.post('https://api.praysely.com/api/singlePost/', data, config(data.token))
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
        setViewCommentModal: (state, action) => { 
            state.commentModalData = action.payload.commentModalData
            state.viewCommentModal = action.payload.viewCommentModal
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
            // // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            //  moved to commentSlice
            // .addCase(getPostComments.pending, (state, action) => {
            //     state.getCommentsLoading = true;
            //     state.getCommentsSuccess = false;
            //     state.getCommentsError = false;
            // })
            // .addCase(getPostComments.fulfilled, (state, action) => {
            //     state.getCommentsLoading = false;
            //     state.getCommentsSuccess = true; 
            //     state.comments = action.payload.docs
 
                
            //     console.log(action.payload.docs.length)
            // })
            // .addCase(getPostComments.rejected, (state, action) => {
            //     state.getCommentsLoading = false;
            //     state.getCommentsError = true;
            //     state.errorMessage = action.error.message;
            // })
            // // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            // .addCase(setSinglePostComment.pending, (state, action) => {
            //     state.setCommentLoading = true;
            //     state.setCommentSuccess = false;
            //     state.setCommentError = false;
            // })
            // .addCase(setSinglePostComment.fulfilled, (state, action) => {
            //     state.setCommentLoading = false;
            //     state.setCommentSuccess = true; 
            //     state.comments.unshift(action.payload)
            // })
            // .addCase(setSinglePostComment.rejected, (state, action) => {
            //     state.setCommentLoading = false;
            //     state.setCommentError = true;
            //     state.errorMessage = action.error.message;
            // }) 
            // // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            .addCase(getSinglePost.pending, (state, action) => {
                state.singlePostLoading = true;
                state.singlePostSuccess = false;
                state.singlePostError = false;
            })
            .addCase(getSinglePost.fulfilled, (state, action) => {
                state.singlePostLoading = false;
                state.singlePostSuccess = true; 
                state.singlePostData = action.payload
            })
            .addCase(getSinglePost.rejected, (state, action) => {
                state.singlePostLoading = false;
                state.singlePostError = true;
                state.errorMessage = action.error.message;
            })
        } 
  });
 
  export const { setViewPosts, setLikeLoading, setViewSinglePost, setViewCommentModal } = postSlice.actions;
  
  export default postSlice.reducer;