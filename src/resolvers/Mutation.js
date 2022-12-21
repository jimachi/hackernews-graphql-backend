const { prisma } = require('@prisma/client');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
import { APP_SECRET } from '../utils';

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

  const token = jwt.sign({ userId: user.id, APP_SECRET });

  return {
    token,
    user,
  }
};

// user login
const login = async (parent, args, context) => {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  })

  if (!user) {
    throw new Error("ユーザーが存在しません");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if(!valid) {
    throw new Error("無効なパスワードです");
  }

  const token = jwt.sign({ userId: user.id, APP_SECRET });
  return {
    token,
    user,
  }
};

// ニュースを投稿するリゾルバ
const post = async (parent, args, context) => {
  const { userId } = context;
  return await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId }}
    },
  });
};

modules.exports = {
  signUp,
  login,
  post,
};
