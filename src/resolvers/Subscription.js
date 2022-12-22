const newLinkSubscribe = (parent, args, context) => {
  return context.pubsub.asyncIterator("NEW_LINK");
};

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => payload,
};

const newLVoteSubscribe = (parent, args, context) => {
  return context.pubsub.asyncIterator("NEW_VOTE");
};

const newLVote = {
  subscribe: newLVoteSubscribe,
  resolve: (payload) => payload,
};

module.exports = {
  newLink,
  newLVote
};
