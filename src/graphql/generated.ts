import type { GraphQLResolveInfo } from "graphql";
import type { MercuriusContext } from "mercurius";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) =>
  | Promise<import("mercurius-codegen").DeepPartial<TResult>>
  | import("mercurius-codegen").DeepPartial<TResult>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
};

export type Query = {
  __typename?: "Query";
  room?: Maybe<Room>;
};

export type QueryroomArgs = {
  id: Scalars["Int"];
};

export type Mutation = {
  __typename?: "Mutation";
  createRoom?: Maybe<Room>;
  joinRoom?: Maybe<Room>;
  leaveRoom?: Maybe<Room>;
  startGame?: Maybe<Scalars["Boolean"]>;
};

export type MutationcreateRoomArgs = {
  playerName: Scalars["String"];
  language: Language;
};

export type MutationjoinRoomArgs = {
  roomId: Scalars["Int"];
  playerName: Scalars["String"];
};

export type MutationleaveRoomArgs = {
  roomId: Scalars["Int"];
  playerName: Scalars["String"];
};

export type MutationstartGameArgs = {
  roomId: Scalars["Int"];
};

export type Subscription = {
  __typename?: "Subscription";
  roomUpdated?: Maybe<Room>;
  gameStarted?: Maybe<RoleInfo>;
};

export type SubscriptionroomUpdatedArgs = {
  roomId: Scalars["Int"];
};

export type SubscriptiongameStartedArgs = {
  roomId: Scalars["Int"];
  playerName: Scalars["String"];
};

export type Room = {
  __typename?: "Room";
  id: Scalars["Int"];
  language: Language;
  players: Array<Player>;
};

export type Player = {
  __typename?: "Player";
  name: Scalars["String"];
  friends?: Maybe<Array<Maybe<Player>>>;
};

export type RoleInfo = ImpostorInfo | RegularInfo;

export type ImpostorInfo = {
  __typename?: "ImpostorInfo";
  dummy?: Maybe<Scalars["String"]>;
};

export type RegularInfo = {
  __typename?: "RegularInfo";
  word: Scalars["String"];
};

export const Language = {
  en: "en",
  fr: "fr",
} as const;

export type Language = (typeof Language)[keyof typeof Language];

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes = {
  RoleInfo: ImpostorInfo | RegularInfo;
};

/** Mapping of union parent types */
export type ResolversUnionParentTypes = {
  RoleInfo: ImpostorInfo | RegularInfo;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Subscription: ResolverTypeWrapper<{}>;
  Room: ResolverTypeWrapper<Room>;
  Player: ResolverTypeWrapper<Player>;
  RoleInfo: ResolverTypeWrapper<ResolversUnionTypes["RoleInfo"]>;
  ImpostorInfo: ResolverTypeWrapper<ImpostorInfo>;
  RegularInfo: ResolverTypeWrapper<RegularInfo>;
  Language: Language;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Int: Scalars["Int"];
  Mutation: {};
  String: Scalars["String"];
  Boolean: Scalars["Boolean"];
  Subscription: {};
  Room: Room;
  Player: Player;
  RoleInfo: ResolversUnionParentTypes["RoleInfo"];
  ImpostorInfo: ImpostorInfo;
  RegularInfo: RegularInfo;
};

export type QueryResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  room?: Resolver<
    Maybe<ResolversTypes["Room"]>,
    ParentType,
    ContextType,
    RequireFields<QueryroomArgs, "id">
  >;
};

export type MutationResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  createRoom?: Resolver<
    Maybe<ResolversTypes["Room"]>,
    ParentType,
    ContextType,
    RequireFields<MutationcreateRoomArgs, "playerName" | "language">
  >;
  joinRoom?: Resolver<
    Maybe<ResolversTypes["Room"]>,
    ParentType,
    ContextType,
    RequireFields<MutationjoinRoomArgs, "roomId" | "playerName">
  >;
  leaveRoom?: Resolver<
    Maybe<ResolversTypes["Room"]>,
    ParentType,
    ContextType,
    RequireFields<MutationleaveRoomArgs, "roomId" | "playerName">
  >;
  startGame?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationstartGameArgs, "roomId">
  >;
};

export type SubscriptionResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"],
> = {
  roomUpdated?: SubscriptionResolver<
    Maybe<ResolversTypes["Room"]>,
    "roomUpdated",
    ParentType,
    ContextType,
    RequireFields<SubscriptionroomUpdatedArgs, "roomId">
  >;
  gameStarted?: SubscriptionResolver<
    Maybe<ResolversTypes["RoleInfo"]>,
    "gameStarted",
    ParentType,
    ContextType,
    RequireFields<SubscriptiongameStartedArgs, "roomId" | "playerName">
  >;
};

export type RoomResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Room"] = ResolversParentTypes["Room"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  language?: Resolver<ResolversTypes["Language"], ParentType, ContextType>;
  players?: Resolver<Array<ResolversTypes["Player"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Player"] = ResolversParentTypes["Player"],
> = {
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  friends?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Player"]>>>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoleInfoResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["RoleInfo"] = ResolversParentTypes["RoleInfo"],
> = {
  resolveType: TypeResolveFn<
    "ImpostorInfo" | "RegularInfo",
    ParentType,
    ContextType
  >;
};

export type ImpostorInfoResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["ImpostorInfo"] = ResolversParentTypes["ImpostorInfo"],
> = {
  dummy?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegularInfoResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["RegularInfo"] = ResolversParentTypes["RegularInfo"],
> = {
  word?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MercuriusContext> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Room?: RoomResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  RoleInfo?: RoleInfoResolvers<ContextType>;
  ImpostorInfo?: ImpostorInfoResolvers<ContextType>;
  RegularInfo?: RegularInfoResolvers<ContextType>;
};

export type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj;
    params: TParams;
  }>,
  context: TContext & {
    reply: import("fastify").FastifyReply;
  },
) => Promise<Array<import("mercurius-codegen").DeepPartial<TReturn>>>;
export type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>;
      opts?: {
        cache?: boolean;
      };
    };
export interface Loaders<
  TContext = import("mercurius").MercuriusContext & {
    reply: import("fastify").FastifyReply;
  },
> {
  Room?: {
    id?: LoaderResolver<Scalars["Int"], Room, {}, TContext>;
    language?: LoaderResolver<Language, Room, {}, TContext>;
    players?: LoaderResolver<Array<Player>, Room, {}, TContext>;
  };

  Player?: {
    name?: LoaderResolver<Scalars["String"], Player, {}, TContext>;
    friends?: LoaderResolver<Maybe<Array<Maybe<Player>>>, Player, {}, TContext>;
  };

  ImpostorInfo?: {
    dummy?: LoaderResolver<
      Maybe<Scalars["String"]>,
      ImpostorInfo,
      {},
      TContext
    >;
  };

  RegularInfo?: {
    word?: LoaderResolver<Scalars["String"], RegularInfo, {}, TContext>;
  };
}
declare module "mercurius" {
  interface IResolvers
    extends Resolvers<import("mercurius").MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
