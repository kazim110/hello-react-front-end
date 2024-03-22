import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  entity: '',
  status: 'idle',
  error: null,
};

// Async thunk action
export const fetchGreeting = createAsyncThunk(
  'messages/fetchGreeting',
  async () => {
    const response = await axios.get('http://localhost:3001/random_greeting');
    return response.data.greeting;
  },
);

const greetingSlice = createSlice({
  name: 'greeting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGreeting.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGreeting.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entity = action.payload;
      })
      .addCase(fetchGreeting.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default greetingSlice.reducer;
