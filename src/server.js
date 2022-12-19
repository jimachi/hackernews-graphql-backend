const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

// HackerNewsの１つ１つの投稿
const links = [
  {
    id: "link-0",
    description: "GraphQLチュートリアル",
    url: "http://example.com",
  },
];

// Resolver関数
// 定義した型に対して値を入力する
const resolvers = {
  Query: {
    info: () => "HackerNewsクローン",
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);
      return link;
    }
  }
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({url}) => console.log(`${url}でサーバーを起動中...`));
