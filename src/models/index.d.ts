import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerLeaderboard = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Leaderboard, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly score: number;
  readonly avatarSrc: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLeaderboard = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Leaderboard, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly score: number;
  readonly avatarSrc: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Leaderboard = LazyLoading extends LazyLoadingDisabled ? EagerLeaderboard : LazyLeaderboard

export declare const Leaderboard: (new (init: ModelInit<Leaderboard>) => Leaderboard) & {
  copyOf(source: Leaderboard, mutator: (draft: MutableModel<Leaderboard>) => MutableModel<Leaderboard> | void): Leaderboard;
}