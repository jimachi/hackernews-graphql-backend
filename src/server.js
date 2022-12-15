const { ApolloServer, gql } = require("apollo-server");

// HackerNewsの１つ１つの投稿
const links = [
  {
    id: "link-0",
    description: "GraphQLチュートリアル",
    url: "http://example.com",
  },
];

// GraphQLスキーマの定義
const typeDefs = gql`
  type Query {
    # !はnot nullである必要がある
    info: String!
    feed: [Link]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

// Resolver関数
// 定義した型に対して値を入力する
const resolvers = {
  Query: {
    info: () => "HackerNewsクローン",
    feed: () => links,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({url}) => console.log(`${url}でサーバーを起動中...`));
