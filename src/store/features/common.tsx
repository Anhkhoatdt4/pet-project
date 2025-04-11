import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "commonState",
  initialState: { loading: false },
    reducers: {
        setLoading: (state, action) => {
        return {
            ...state,
            loading: action?.payload,
        };
        },
    }
});
export const { setLoading } = commonSlice?.actions;
export default commonSlice.reducer;