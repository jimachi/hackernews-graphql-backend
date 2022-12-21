const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require('@prisma/client');
const { getUserId } = require("./utils");

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Link = require('./resolvers/Link');
const User = require('./resolvers/User');

const prisma = new PrismaClient();

// Resolver関数
// 定義した型に対して値を入力する
const resolvers = {
  Query,
  Mutation,
  Link,
  User
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: ({ req }) => {
    console.log(req.headers.authorization)
    return {
      ...req,
      prisma,
      userId: req && req.headers?.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({url}) => console.log(`${url}でサーバーを起動中...`));
