const newLinkSubscribe = (parent, args, context) => {
  return context.pubsub.asyncIterator("New_LINK");
};

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => payload,
};

module.exports = {
  newLinkSubscribe
};
