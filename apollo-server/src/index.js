const { ApolloServer, gql } = require('apollo-server');
const faker = require('faker');

const createData = (position) => {
  var out = [];
  
  for (let i = 0; i < 10; i++) {
    out[i] = {
      id: i,
      position: position,
      name: faker.name.findName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar()
    }
  }
  return out
}
const cv = {
  'senior developer': {...createData('senior developer')},
  'associate developer': {...createData('associate developer')},
  'junior developer': {...createData('junior developer')}
};

const typeDefs = gql`
  type cv {
    id: Int
    position: String
    name: String
    email: String
    avatar: String
  }

  input position {
    position: String
  }

  type positionString {
    cv: [cv]
  }

  type Query {
    getCv(id: ID!, position: position): positionString
  }
`;

const resolvers = {
  Query: {
    getCv: (parent, args, context) => {
      console.log("args", args)
      console.log(cv[args.position])
      return cv[args.position]
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
