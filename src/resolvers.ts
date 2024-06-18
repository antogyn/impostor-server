import type { FastifyInstance } from "fastify";
import mercurius from "mercurius";
import { gql } from "mercurius-codegen";
import type { Subscription } from "./graphql/generated";
import { createRoom } from "./repositories/room.repository";
import { findRoom } from "./use-cases/find-room.use-case";
import { joinRoom } from "./use-cases/join-room.use-case";
import { leaveRoom } from "./use-cases/leave-room.use-case";
import { startGame } from "./use-cases/start-game.use-case";

export function registerResolvers(server: FastifyInstance) {
  server.register(mercurius, {
    graphiql: true,
    subscription: true,
    schema: gql`
      type Query {
        room(id: Int!): Room
      }
  
      type Mutation {
        createRoom(playerName: String!, language: Language!): Room
        joinRoom(roomId: Int!, playerName: String!): Room
        leaveRoom(roomId: Int!, playerName: String!): Room
        startGame(roomId: Int!): Boolean
      }
  
      type Subscription {
        roomUpdated(roomId: Int!): Room
        gameStarted(roomId: Int!, playerName: String!): RoleInfo
      }
  
      type Room {
        id: Int!
        language: Language!
        players: [Player!]!
      }
  
      type Player {
        name: String!
        friends: [Player]
      }
  
      union RoleInfo = ImpostorInfo | RegularInfo
  
      type ImpostorInfo {
        dummy: String
      }
  
      type RegularInfo {
        word: String!
      }

      enum Language {
        en
        fr
      }
    `,
    resolvers: {
      Query: {
        async room(_, { id }) {
          return findRoom(id);
        },
      },
      Mutation: {
        async joinRoom(_, { roomId, playerName }, { pubsub }) {
          const room = await joinRoom(roomId, playerName);

          await pubsub.publish<Required<Pick<Subscription, "roomUpdated">>>({
            topic: `roomUpdated:${roomId}`,
            payload: {
              roomUpdated: room,
            },
          });

          return room;
        },

        async leaveRoom(_, { roomId, playerName }, { pubsub }) {
          const room = await leaveRoom(roomId, playerName);

          await pubsub.publish<Required<Pick<Subscription, "roomUpdated">>>({
            topic: `roomUpdated:${roomId}`,
            payload: {
              roomUpdated: room,
            },
          });

          return room;
        },

        async createRoom(_, { playerName, language }) {
          return await createRoom(playerName, language);
        },

        async startGame(_, { roomId }, { pubsub }) {
          const playerRoles = startGame(roomId);

          for (const playerRole of playerRoles) {
            await pubsub.publish<Required<Pick<Subscription, "gameStarted">>>({
              topic: `gameStarted:${roomId}:${playerRole.playerName}`,
              payload: {
                gameStarted:
                  playerRole.role === "Impostor"
                    ? {
                        __typename: "ImpostorInfo",
                      }
                    : {
                        __typename: "RegularInfo",
                        word: playerRole.word,
                      },
              },
            });
          }

          return true;
        },
      },
      Subscription: {
        roomUpdated: {
          async subscribe(_, { roomId }, { pubsub }) {
            return await pubsub.subscribe(`roomUpdated:${roomId}`);
          },
        },
        gameStarted: {
          async subscribe(_, { roomId, playerName }, { pubsub }) {
            return await pubsub.subscribe(`gameStarted:${roomId}:${playerName}`);
          },
        },
      },
    },
  });
}
