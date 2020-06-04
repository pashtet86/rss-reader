export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('rss-reader-state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};


export const saveState = (state) => {

  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('rss-reader-state', serializedState);
  } catch {
    // ignore write errors
  }
};

export default saveState;