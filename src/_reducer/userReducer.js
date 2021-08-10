import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSignUp = createAsyncThunk('user/signUpUser', async(signUpInfo, { rejectWithValue, getState, requestId }) => {
    try {
        const {isLoading, signUpState } = getState().user;
        if(!isLoading || signUpState.currentRequestId !== requestId) return; 
        const {data} = await axios.post('/api/users/signUp', signUpInfo);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchSignIn = createAsyncThunk('user/signInUser', async(signInInfo, { rejectWithValue, getState, requestId }) => {
    try {
        const {isLoading, signInState} = getState().user;
        if(!isLoading || signInState.currentRequestId !== requestId) return;
        const {data} = await axios.post('/api/users/signIn', signInInfo);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchSignOut = createAsyncThunk('user/signOutUser', async(_, { rejectWithValue, getState, requestId }) => {
    try {
        const {isLoading, signInState} = getState().user;
        if(!isLoading || signInState.currentRequestId !== requestId) return;
        const {data} = await axios.get('/api/users/signOut');
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchAuth = createAsyncThunk('/user/authUser', async(_, { rejectWithValue, getState, requestId}) => {
    try {
        const {isLoading, authState} = getState().user;
        if(!isLoading || authState.currentRequestId !== requestId) return;
        const result = await axios.get('/api/users/auth');

        return result.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchGoogleOAuth = createAsyncThunk('/api/user/googleOAuth', async(oauthInfo, { rejectWithValue, getState, requestId }) => {
    try {
        const {isLoading, signInState} = getState().user;
        if(!isLoading || signInState.currentRequestId !== requestId) return; 
        const {data} = await axios.post('/api/users/snsSignCheck', oauthInfo);
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response);
    }
});

const initialState = {
    isLoading: false,
    signInState: {
        result: false,
        currentRequestId: undefined,
    },
    signUpState: {
        result: false,
        currentRequestId: undefined,
    },
    authState: {
        result: false,
        useInfo: {},
        currentRequestId: undefined,
    },
    errorMessage: ""
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //
        builder.addCase(fetchSignUp.pending, (state, action) => {
            if(!state.isLoading) {
                state.isLoading = true;
                state.signUpState.currentRequestId = action.meta.requestId;
            }
        })
        .addCase(fetchSignUp.fulfilled, (state, action) => {
            if(state.isLoading && (state.signUpState.currentRequestId === action.meta.requestId)) {
                state.isLoading = false;
                state.signUpState.result = action.payload.signUpSuccess;
                state.signUpState.currentRequestId = undefined;
            }
        })
        .addCase(fetchSignUp.rejected, (state, action) => {
            if(state.isLoading && (state.signUpState.currentRequestId === action.meta.requestId)) {
                state.isLoading = false;
                state.signUpState.currentRequestId = undefined;
                state.errorMessage = action.payload.message;
            }
        });
        //
        builder.addCase(fetchSignIn.pending, (state, action) => {
            if(!state.isLoading) {
                state.isLoading = true;
                state.signInState.currentRequestId = action.meta.requestId;
            }
        })
        .addCase(fetchSignIn.fulfilled, (state, action) => {
            if(state.isLoading && (state.signInState.currentRequestId === action.meta.requestId)) {
                state.isLoading = false;
                state.signInState.result = action.payload.signInSuccess;
                state.signInState.currentRequestId = undefined;
            }
        })
        .addCase(fetchSignIn.rejected, (state, action) => {
            if(state.isLoading && (state.signInState.currentRequestId === action.meta.requestId)) {
                state.isLoading = false;
                state.signInState.currentRequestId = undefined;
                state.errorMessage = action.payload.message;
            }
        });
        //
        builder.addCase(fetchSignOut.pending, (state, action) => {
            if(!state.isLoading) {
                state.isLoading = true;
                state.signInState.currentRequestId = action.meta.requestId;
            }
        })
        .addCase(fetchSignOut.fulfilled, (state, action) => {
            if(state.isLoading && (state.signInState.currentRequestId === action.meta.requestId)) {
                state.isLoading = false;
                state.signInState.result = false;
                state.signInState.currentRequestId = undefined;
                state.authState.result = false;
                state.authState.userInfo = {};
            }
        })
        .addCase(fetchSignOut.rejected, (state, action) => {
            if(state.isLoading && (state.signInState.currentRequestId === action.meta.requestId)) {
                state.isLoading = false;
                state.signInState.currentRequestId = undefined;
                state.errorMessage = action.payload.message;
            }
        });
        //
        builder.addCase(fetchAuth.pending, (state, action) => {
            if(!state.isLoading) {
                state.isLoading = true;
                state.authState.currentRequestId = action.meta.requestId;
            }
        })
        .addCase(fetchAuth.fulfilled, (state, action) => {
            if(state.isLoading && (state.authState.currentRequestId === action.meta.requestId)) {
                state.isLoading = false;
                state.signInState.result = action.payload.isAuth;
                state.authState.result = action.payload.isAuth;
                state.authState.userInfo = action.payload;
                state.authState.currentRequestId = undefined;
            }
        })
        .addCase(fetchAuth.rejected, (state, action) => {
            if(state.isLoading && (state.authState.currentRequestId === action.meta.requestId)) {
                state.isLoading = false;
                state.signInState.result = false;
                state.authState.currentRequestId = undefined;
                state.errorMessage = action.payload.message;
            }
        });
        //
        builder.addCase(fetchGoogleOAuth.pending, (state, action) => {
            if(!state.isLoading) {
                state.isLoading = true;
                state.signInState.currentRequestId = action.meta.requestId;
            }
        })
        .addCase(fetchGoogleOAuth.fulfilled, (state, action) => {
            if(state.isLoading && (state.signInState.currentRequestId === action.meta.requestId)) {
                state.isLoading = false;
                state.signInState.result = action.payload.isOAuth;
                state.signInState.currentRequestId = undefined;
            }
        })
        .addCase(fetchGoogleOAuth.rejected, (state, action) => {
            if(state.isLoading && (state.signInState.currentRequestId === action.meta.requestId)) {
                console.log(action)
                state.isLoading = false;
                state.signInState.currentRequestId = undefined;
                state.errorMessage = action.payload;
            }
        });
    }
});

export const { authUser } = userSlice.actions;

export default userSlice.reducer;