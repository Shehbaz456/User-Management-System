import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../utils/apiClient';

// Fetch all users from API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await apiClient.get('/users');
        console.log(response.data);
        
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error fetching users');
    }
});

// Add new user with hobbies
export const addUser = createAsyncThunk('users/addUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await apiClient.post('/users', userData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error adding user');
    }
});

// Update user (including hobbies)
export const updateUser = createAsyncThunk('users/updateUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await apiClient.put(`/users/${userData.id}`, userData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error updating user');
    }
});

// Delete user from API
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId, { rejectWithValue }) => {
    try {
        await apiClient.delete(`/users/${userId}`);
        return userId;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error deleting user');
    }
});

const userSlice = createSlice({
    name: 'users',
    initialState: { users: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.id !== action.payload);
            });
    }
});

export default userSlice.reducer;
