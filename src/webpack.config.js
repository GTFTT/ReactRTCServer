module.exports = {
  //...
  target: "web",
  node: {
    fs: "empty",
  },
  resolve: {
    fallback: {
      fs: false,
    },
  },
};
