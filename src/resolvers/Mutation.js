const { prisma } = require('@prisma/client');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require('../utils');

// ユーザー新規登録のリゾルバ
const signUp = async (parent, args, context) => {
  // passwordの設定
  const password = await bcrypt.hash(args.password, 10);

  // ユーザーの新規作成
  const user = await context.prisma.user.create({
    data: {
      ...args,
      password,
    }
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  }
};

// user login
const login = async (parent, args, context) => {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error("ユーザーが存在しません");
  }

  const valid = await bcrypt.compare(args.password, user.password);

  if(!valid) {
    throw new Error("無効なパスワードです");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  }
};

// ニュースを投稿するリゾルバ
const post = async (parent, args, context) => {
  const { userId } = context;

  const newLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId }}
    },
  });

  // 送信
  context.pubsub.publish("NEW_LINK", newLink);

  return newLink;
};

const vote = async (parent, args, context) => {
  const { userId } = context;

  const vote = context.prisma.vote.findUnique({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId: userId,
      }
    }
  });

  if (Boolean(vote)) {
    throw new Error(`既に投票されています: ${args.linkId}`);
  }

  const newVote = context.prisma.vote.create({
    data: {
      user: { connect: { id: userId }},
      link: { connect: { id: Number(args.linkId) }},
    }
  });

  context.pubsub.publish("NEW_VOTE", newVote);

  return newVote;
};

module.exports = {
  signUp,
  login,
  post,
  vote
};
