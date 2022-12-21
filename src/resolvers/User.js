const links = (parent, args, context) => {
  return context.prisma.user.findUnique({
    where: {
      parent.id
    }
  })
  .links();
};

module.exports = {
  links,
};
