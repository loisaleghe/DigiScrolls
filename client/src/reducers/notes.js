const initialState = {
  currentUserNotes: [],
  userNotes: [],
  groupNotes: [],
  notes: null,
  loading: false,
  success: false,
  message: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};
