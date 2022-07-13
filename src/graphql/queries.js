/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProject13 = /* GraphQL */ `
  query GetProject13($id: ID!, $name: String!) {
    getProject13(id: $id, name: $name) {
      id
      name
      description
      team {
        id
        name
        description
        project {
          id
          name
          description
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          project13TeamId
          project13TeamName
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        team13ProjectId
        team13ProjectName
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      project13TeamId
      project13TeamName
    }
  }
`;
export const listProject13s = /* GraphQL */ `
  query ListProject13s(
    $id: ID
    $name: ModelStringKeyConditionInput
    $filter: ModelProject13FilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listProject13s(
      id: $id
      name: $name
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        description
        team {
          id
          name
          description
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          team13ProjectId
          team13ProjectName
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        project13TeamId
        project13TeamName
      }
      nextToken
      startedAt
    }
  }
`;
export const syncProject13s = /* GraphQL */ `
  query SyncProject13s(
    $filter: ModelProject13FilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProject13s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        team {
          id
          name
          description
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          team13ProjectId
          team13ProjectName
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        project13TeamId
        project13TeamName
      }
      nextToken
      startedAt
    }
  }
`;
export const getTeam13 = /* GraphQL */ `
  query GetTeam13($id: ID!, $name: String!) {
    getTeam13(id: $id, name: $name) {
      id
      name
      description
      project {
        id
        name
        description
        team {
          id
          name
          description
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          team13ProjectId
          team13ProjectName
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        project13TeamId
        project13TeamName
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      team13ProjectId
      team13ProjectName
    }
  }
`;
export const listTeam13s = /* GraphQL */ `
  query ListTeam13s(
    $id: ID
    $name: ModelStringKeyConditionInput
    $filter: ModelTeam13FilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTeam13s(
      id: $id
      name: $name
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        description
        project {
          id
          name
          description
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          project13TeamId
          project13TeamName
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        team13ProjectId
        team13ProjectName
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTeam13s = /* GraphQL */ `
  query SyncTeam13s(
    $filter: ModelTeam13FilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTeam13s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        project {
          id
          name
          description
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          project13TeamId
          project13TeamName
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        team13ProjectId
        team13ProjectName
      }
      nextToken
      startedAt
    }
  }
`;
