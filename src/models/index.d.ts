import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type Project13MetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type Team13MetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Project13 {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly team?: Team13 | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly project13TeamId?: string | null;
  constructor(init: ModelInit<Project13, Project13MetaData>);
  static copyOf(source: Project13, mutator: (draft: MutableModel<Project13, Project13MetaData>) => MutableModel<Project13, Project13MetaData> | void): Project13;
}

export declare class Team13 {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly project?: Project13 | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Team13, Team13MetaData>);
  static copyOf(source: Team13, mutator: (draft: MutableModel<Team13, Team13MetaData>) => MutableModel<Team13, Team13MetaData> | void): Team13;
}