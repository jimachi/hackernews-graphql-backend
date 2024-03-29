const newLinkSubscribe = (parent, args, context) => {
  return context.pubsub.asyncIterator("NEW_LINK");
};

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => payload,
};

const newVoteSubscribe = (parent, args, context) => {
  return context.pubsub.asyncIterator("NEW_VOTE");
};

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload) => payload,
};

module.exports = {
  newLink,
  newVote
};
