import { createSlice } from '@reduxjs/toolkit';

const activeLinkSlice = createSlice({
  name: 'activeLink',
  initialState: '',
  reducers: {
    setActiveLink: (state, action) => action.payload,
  },
});

export const { setActiveLink } = activeLinkSlice.actions;
export default activeLinkSlice.reducer;