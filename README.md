# 1.2.b Has one - bidirectional (with id)
type Project13 @model {
	id: ID! @primaryKey(sortKeyFields: ["name"])
	name: String!
	description: String!
	team: Team13 @hasOne
}

type Team13 @model {
	id: ID! @primaryKey(sortKeyFields: ["name"])
	name: String!
	description: String!
	project: Project13 @belongsTo
}

- Project (when saved with either keys, or team) will contain the Team instance
- Team will not contain the project instance