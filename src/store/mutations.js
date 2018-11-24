export default {
  DOCOLLAPSE(state, collapse) {
    state.collapse = collapse
  },
  OPTIONS(state, tabs) {
    state.options.push(tabs)
  },
  USER(state, user) {
    state.user = user
  },
  SEARCHYM(state, searchym) {
    state.searchym = searchym
  },
  REFRESH(state, refresh) {
    state.refresh = state.refresh + refresh
  },

}
