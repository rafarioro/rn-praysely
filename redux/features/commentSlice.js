import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../apiHeaders';

const initialState = {
    comments: [],

    // should also be for replies
    viewCommentModal: false,
    commentModalData: {},

    addReplyId: '',
    viewReplies: false,
    commentIdOfNewReply: '',
    latestReply: {},

    getCommentsLoading: false,  
    getCommentsSuccess: false,
    getCommentsError: false,

    setCommentLoading: false,
    setCommentSuccess: false,
    setCommentError: false,

    setReplyLoading: false,
    setReplySuccess: false,
    setReplyError: false,
}


export const getComments = createAsyncThunk('comments/geComments', async (data) => {
    const response = await axios.post(data.url, data, config(data.token))
    return response.data
});

export const setComment = createAsyncThunk('comments/setComment', async (data) => {
    const response = await axios.post(data.url, data, config(data.token))
    return response.data
});

export const setReply = createAsyncThunk('comments/setReply', async (data) => {
    const response = await axios.post(data.url, data, config(data.token))
    return response.data
});

  const commentSlice = createSlice({
    name: 'comment',

    initialState, 

    reducers: {
        setAddReply: (state, action) => { 
            // sets the view to true in order to show the reply input
            // and allow the user to reply to a comment given the comment id and post type (event comment, post comment, reply comment)
            state.addReplyId = action.payload.commentId
        },
        setViewCommentModal: (state, action) => { 
            state.commentModalData = action.payload.commentModalData
            state.viewCommentModal = action.payload.viewCommentModal
        },
        hideCommentModal: (state, action) => {

            // hide modal while other things are being done, such as adding a reply

            state.viewCommentModal = false
        } 
    },  
    extraReducers: (builder) => {
        builder
            // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            .addCase(getComments.pending, (state, action) => {
                state.getCommentsLoading = true;
                state.getCommentsSuccess = false;
                state.getCommentsError = false;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.getCommentsLoading = false;
                state.getCommentsSuccess = true; 
                state.comments = action.payload.docs

                console.log(action.payload.docs.length)
            })
            .addCase(getComments.rejected, (state, action) => {
                state.getCommentsLoading = false;
                state.getCommentsError = true;
                state.errorMessage = action.error.message;
            })
            // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            .addCase(setComment.pending, (state, action) => {
                state.setCommentLoading = true;
                state.setCommentSuccess = false;
                state.setCommentError = false;
            })
            .addCase(setComment.fulfilled, (state, action) => {
                state.setCommentLoading = false;
                state.setCommentSuccess = true; 
                state.comments.unshift(action.payload)
            })
            .addCase(setComment.rejected, (state, action) => {
                state.setCommentLoading = false;
                state.setCommentError = true;
                state.errorMessage = action.error.message;
            }) 
            // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
            .addCase(setReply.pending, (state, action) => {
                state.setReplyLoading = true;
                state.setReplySuccess = false;
                state.setReplyError = false;
            })
            .addCase(setReply.fulfilled, (state, action) => {
                state.setReplyLoading = false;
                state.setReplySuccess = true; 

                state.addReplyId = '';
                state.commentIdOfNewReply = action.payload.updatedComment._id;
                state.comments[action.payload.commentIndex] = action.payload.updatedComment;
                state.latestReply = action.payload.newReply;
            })
            .addCase(setReply.rejected, (state, action) => {
                state.setReplyLoading = false;
                state.setReplyError = true;
                state.errorMessage = action.error.message;
            })
        } 
  });
 
  export const { setAddReply, setViewCommentModal, hideCommentModal } = commentSlice.actions;
  
  export default commentSlice.reducer;