/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProject13 = /* GraphQL */ `
  mutation CreateProject13(
    $input: CreateProject13Input!
    $condition: ModelProject13ConditionInput
  ) {
    createProject13(input: $input, condition: $condition) {
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
export const updateProject13 = /* GraphQL */ `
  mutation UpdateProject13(
    $input: UpdateProject13Input!
    $condition: ModelProject13ConditionInput
  ) {
    updateProject13(input: $input, condition: $condition) {
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
export const deleteProject13 = /* GraphQL */ `
  mutation DeleteProject13(
    $input: DeleteProject13Input!
    $condition: ModelProject13ConditionInput
  ) {
    deleteProject13(input: $input, condition: $condition) {
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
export const createTeam13 = /* GraphQL */ `
  mutation CreateTeam13(
    $input: CreateTeam13Input!
    $condition: ModelTeam13ConditionInput
  ) {
    createTeam13(input: $input, condition: $condition) {
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
export const updateTeam13 = /* GraphQL */ `
  mutation UpdateTeam13(
    $input: UpdateTeam13Input!
    $condition: ModelTeam13ConditionInput
  ) {
    updateTeam13(input: $input, condition: $condition) {
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
export const deleteTeam13 = /* GraphQL */ `
  mutation DeleteTeam13(
    $input: DeleteTeam13Input!
    $condition: ModelTeam13ConditionInput
  ) {
    deleteTeam13(input: $input, condition: $condition) {
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
