import { GraphQLClient } from "graphql-request";

export const CLIENT = new GraphQLClient(
  "https://relationtips.herokuapp.com/v1alpha1/graphql",
  { headers: { "x-hasura-access-key": "!@#1#@!123@!$34$^%$&923@AfnsD" } }
);
