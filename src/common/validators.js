const checked = (value, options) => {
  if (value !== true) {
    return options.message || 'must be checked';
  }
};

const empty = (value, options) => {
  if (!value) {
    return options.message || 'cannot be empty';
  }
};

export default {
  checked,
  empty
};
