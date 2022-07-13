import './projectStyles.css';
import { useState, useEffect } from 'react';
import { DataStore, Predicates } from 'aws-amplify';
import { Project13, Team13 } from './models';
import { ulid } from 'ulid';

// TODO:
// const SAME_ULID = ulid();
let subscriptions = [];

function App() {
	const [project13s, setProject13s] = useState([]);
	const [team13s, setTeam13s] = useState([]);
	const [currentTeam, setCurrentTeam] = useState(null);
	const [currentProject, setCurrentProject] = useState(null);
	const [subMsg, setSubMsg] = useState([]);
	const [snapshots, setSnapshots] = useState([]);
	const [filteredSnapshots, setFilteredSnapshots] = useState([]);

	useEffect(() => {
		initSubs();

		return () => {
			unsubSubs();
		};
	}, []);

	function initSubs() {
		if (subscriptions.length) {
			unsubSubs();
		}

		// Observe Project13
		subscriptions.push(
			DataStore.observe(Project13).subscribe((msg) => {
        console.log('observe', msg);
				clearSubscriptionState();
				setSubMsg(msg);
			})
		);

		// ObserveQuery Project13
		subscriptions.push(
			DataStore.observeQuery(Project13).subscribe((data) => {
        console.log('observeQuery', data);
				clearSubscriptionState();
				setSnapshots(prev => [...prev, data] );
			})
		);

		// ObserveQuery Project13 with filter
		subscriptions.push(
			DataStore.observeQuery(Project13, t =>
				t.name('contains', 'Project13')
			).subscribe(snapshot => {
        console.log('filtered observeQuery', snapshot);
				clearSubscriptionState();
				setFilteredSnapshots(prev => [...prev, snapshot] );
			})
		);

		// Observe Team13
		subscriptions.push(
			DataStore.observe(Team13).subscribe(msg => {
        console.log('observe', msg);
				clearSubscriptionState();
				setSubMsg(msg);
			})
		);

		// ObserveQuery Team13
		subscriptions.push(
			DataStore.observeQuery(Team13).subscribe(data => {
        console.log('observeQuery', data);
				clearSubscriptionState();
				setSnapshots(prev => [...prev, data] );
			})
		);

		// ObserveQuery Team13 with filter
		subscriptions.push(
			DataStore.observeQuery(Team13, t =>
				t.name('contains', 'Team13')
			).subscribe(snapshot => {
        console.log('filtered observeQuery', snapshot);
				clearSubscriptionState();
				setFilteredSnapshots(prev => [...prev, snapshot] );
			})
		);
	}

	function unsubSubs() {
		subscriptions &&
			subscriptions.length &&
			subscriptions.forEach(sub => sub.unsubscribe());
	}

	function clearQueryState() {
		setProject13s([]);
		setTeam13s([]);
	}
	
	function clearSubscriptionState() {
		setSubMsg([]);
		setSnapshots([]);
		setFilteredSnapshots([]);
	}

	//#region Project 13
	// Query
	async function getProject13s() {
		clearQueryState();
		const _projects = await DataStore.query(Project13);
		setProject13s(_projects);
		console.log('Project13s', _projects);
	}

	// Query by PK Predicate
	async function getProject13ByPkPredicate() {
		clearQueryState();
		const [_project] = await DataStore.query(Project13);
		console.log('first query:', _project);
		if (!_project) return;

		const project = await DataStore.query(Project13, c =>
			c.id('eq', _project.id)
		);

		console.log('by PK Predicate', project);
		setProject13s(project);
	}

	// Query by PK + SK Predicate
	async function getProject13sbyPKSKPredicate() {
		clearQueryState();
		const [_project] = await DataStore.query(Project13);
		console.log('result of first query:', _project);
		if (!_project) return;

		const projects = await DataStore.query(Project13, c =>
			c
				.id('eq', _project.id)
				.name('eq', _project.name)
		);
		console.log('PK + SK Predicate:', projects);
		setProject13s(projects);
	}

	// Does not apply: Query by PK OL (SK present)

	// Query by PK + SK OL
	// async function getProject13sbyPkSkOl() {
	// 	clearQueryState();
	// 	const [_project] = await DataStore.query(Project13);

	// 	const project = await DataStore.query(Project13, {
	// 		id: _project.id,
	// 		name: _project.name,
	// 	});
	// 	console.log('Project13 by PK + SK w/ object literal', project);
	// 	setProject13s(project);
	// }

	// Query by ALL
	async function getProject13ByAll() {
		clearQueryState();
		const project = await DataStore.query(Project13, Predicates.ALL);
		console.log('Query ALL by PK', project);
		if (!project) return;
		setProject13s(project);
	}

	// Create
	async function createProjectForCurrentTeam13WithKeys() {
		if (!currentTeam) return;
		clearQueryState();

		try {
			const project = await DataStore.save(
				new Project13({
					id: ulid(),
					name: 'Project13 Original Name',
					description: 'Project13 Original Description',
					project13TeamId: currentTeam.id
				})
			);

			setCurrentProject(project);
			console.log('Project13 created:', project);
		} catch (error) {
			console.error('Save failed:', error);
		}
	}

	async function createProjectForCurrentTeam13WithInstance() {
		if (!currentTeam) return;
		clearQueryState();

		const currentTeamFromDS = await DataStore.query(Team13, currentTeam.id)

		try {
			const project = await DataStore.save(
				new Project13({
					id: ulid(),
					name: 'Project13 Original Name',
					description: 'Project13 Original Description',
					team: currentTeamFromDS
				})
			);

			setCurrentProject(project);
			console.log('Project13 created:', project);
		} catch (error) {
			console.error('Save failed:', error);
		}
	}

	// Update
	async function updateProject13() {
		clearQueryState();
		const [project] = await DataStore.query(Project13);

		try {
			const team = await DataStore.save(
				Project13.copyOf(project, updated => {
					updated.description = 'UPDATED DESCRIPTION';
				})
			);

			console.log('Project13 created:', team);
		} catch (error) {
			console.error('Save failed:', error);
		}
	}

	// Update PK: should throw TS error, as PK is immutableTS error, as PK is immutable
	async function updateProject13Pk() {
		clearQueryState();
		const [originalProject] = await DataStore.query(Project13);
		console.log('Original Project:', originalProject);

		try {
			const project = await DataStore.save(
				Project13.copyOf(originalProject, updated => {
					// throws TS error, as PK is immutable
					//@ts-expect-error
					updated.name = `name ${Date.now()}`;
				})
			);

			console.log('Project updated:', project);
		} catch (error) {
			console.error('Save failed:', error);
		}
	}

	// Delete
	async function deleteProject13() {
		clearQueryState();
		const [project] = await DataStore.query(Project13);
		if (!project) return;

		await DataStore.delete(project);
	}

	// Does not apply: Delete by PK (SK is present)

	// Delete by PK Predicate
	async function deleteProject13ByPkPredicate() {
		clearQueryState();
		const [project] = await DataStore.query(Project13);
		if (!project) return;

		try {
			const result = await DataStore.delete(Project13, c =>
				c.id('eq', project.id)
			);
			console.log('Project13 deleted:', result);
		} catch (error) {
			console.error('Delete failed:', error);
		}
	}

	// Does not apply: Delete by PK OL

	// Delete by PK + SK Predicate
	async function deleteProject13ByPkSkPredicate() {
		clearQueryState();
		const [project] = await DataStore.query(Project13);
		if (!project) return;

		try {
			await DataStore.delete(Project13, c =>
				c
					.id('eq', project.id)
					.name('eq', project.name)
			);
		} catch (error) {
			console.error('Delete failed:', error);
		}
	}

	// Does not apply: Delete by PK + Multi SK Predicate

	// Delete by PK + SK OL
	// async function deleteProject13ByPkSkOL() {
	// 	clearQueryState();
	// 	const [project] = await DataStore.query(Project13);
	// 	if (!project) return;

	// 	try {
	// 		await DataStore.delete(Project13, {
	// 			id: project.id,
	// 			name: project.name,
	// 		});
	// 	} catch (error) {
	// 		console.error('Delete failed:', error);
	// 	}
	// }

	//#endregion

	//#region Project13 Relational CRUD
	// Query by PK filter
	async function getCurrentTeamProject13sByPkFilter() {
		clearQueryState();
		const projects = (await DataStore.query(Project13)).filter(
			c => c.project13TeamId === currentTeam.id
		);
		setProject13s(projects);
		console.log('Project13s', projects);
	}

	// Query by PK + SK filter
	async function getCurrentTeamProject13sByPkSkFilter() {
		clearQueryState();
		if (!currentTeam) return;
		const projects = (await DataStore.query(Project13)).filter(
			c =>
				c.project13TeamId === currentTeam.id &&
				c.project13TeamName === currentTeam.name
		);
		setProject13s(projects);
		console.log('Project13s', projects);
	}

	// Does not apply to relational query: Query by PK

	// Query by PK Predicate
	async function getCurrentTeamProject13ByPkPredicate() {
		clearQueryState();
		if (!currentTeam) return;
		const project = await DataStore.query(Project13, c =>
			c.project13TeamId('eq', currentTeam.id)
		);
		console.log('by PK Predicate', project);
		setProject13s(project);
	}

	// Query by PK + SK Predicate
	async function getCurrentTeamProject13sbyPKSKPredicate() {
		clearQueryState();
		if (!currentTeam) return;
		const project = await DataStore.query(Project13, c =>
			c
				.project13TeamId('eq', currentTeam.id)
				.project13TeamName('eq', currentTeam.name)
		);
		console.log('by PK Predicate', project);
		setProject13s(project);
	}

	// Does not apply to relational model: Query by PK OL

	// Does not apply to relational model: Query by PK + SK OL

	// Does not apply to relational model: Query by ALL

	// Does not apply to relational model: Create

	// Does not apply to relational model: Update

	// N/A: Update PK: should throw TS error, as PK is immutableTS error, as PK is immutable

	// Does not apply to relational model: Delete

	// Does not apply to relational model: Delete by PK

	// Delete by PK Predicate
	async function deleteCurrentTeamProject13ByPkPredicate() {
		clearQueryState();
		const [project] = await DataStore.query(Project13);
		if (!project) return;

		await DataStore.delete(Project13, c =>
			c.project13TeamId('eq', currentTeam.id)
		);
	}

	// Does not apply to relational model: Delete by PK OL

	// Delete by PK + SK Predicate
	async function deleteCurrentTeamProject13ByPkSkPredicate() {
		clearQueryState();
		const [project] = await DataStore.query(Project13);
		if (!project) return;
		// await DataStore.delete(Project, project.id);
		await DataStore.delete(Project13, c =>
			c
				.project13TeamId('eq', currentTeam.id)
				.project13TeamName('eq', currentTeam.name)
		);
	}

	// Does not apply: Delete by PK + Multi SK Predicate

	// Does not apply to relational model: Delete by PK + SK OL

	//#endregion

	//#region Team13
	// Query
	async function getTeam13s() {
		clearQueryState();
		const _teams = await DataStore.query(Team13);
		setTeam13s(_teams);
		console.log('team13s', _teams);
	}

	// Does not apply: Query by PK (SK present)

	// Query by PK Predicate
	async function getTeam13ByPkPredicate() {
		clearQueryState();
		const [_team] = await DataStore.query(Team13);
		console.log('first query:', _team);
		if (!_team) return;

		const team = await DataStore.query(Team13, c =>
			c.id('eq', _team.id)
		);
		console.log('by PK Predicate', team);
		setTeam13s(team);
	}

	// Query by PK + SK Predicate
	async function getTeam13sbyPKSKPredicate() {
		clearQueryState();
		const [_team] = await DataStore.query(Team13);
		console.log('result of first query:', _team);
		if (!_team) return;

		const teams = await DataStore.query(Team13, c =>
			c.id('eq', _team.id).name('eq', _team.name)
		);

		console.log('PK + SK Predicate:', teams);
		setTeam13s(teams);
	}

	// Does not apply: Query by PK OL

	// Query by PK + SK OL
	// async function getTeam13sbyPkSkOl() {
	// 	clearQueryState();
	// 	const [_team] = await DataStore.query(Team13);

	// 	const team = await DataStore.query(Team13, {
	// 		id: _team.id,
	// 		name: _team.name,
	// 	});

	// 	console.log('team13 by PK + SK w/ object literal', team);
	// 	setTeam13s(team);
	// }

	// Query by ALL
	async function getTeam13ByAll() {
		clearQueryState();
		const team = await DataStore.query(Team13, Predicates.ALL);
		console.log('Query ALL by PK', team);
		if (!team) return;
		setTeam13s(team);
	}

	async function createTeam13() {
		clearQueryState();

		try {
			const team = await DataStore.save(
				new Team13({
					id: ulid(),
					name: 'team13 Original Name',
					description: 'team13 Original Description',
				})
			);

			setCurrentTeam(team);
			console.log('Team13 created:', team);
		} catch (error) {
			console.error('Save failed:', error);
		}
	}

	// Update
	async function updateTeam13() {
		clearQueryState();
		const [originalTeam] = await DataStore.query(Team13);
		try {
			const team = await DataStore.save(
				Team13.copyOf(originalTeam, updated => {
					updated.description = 'UPDATED DESCRIPTION';
				})
			);

			console.log('team13 created:', team);
		} catch (error) {
			console.error('Save failed:', error);
		}
	}

	// Update PK: should throw TS error, as PK is immutableTS error, as PK is immutable
	async function updateTeam13Pk() {
		clearQueryState();
		const [originalteam] = await DataStore.query(Team13);
		console.log('Original team:', originalteam);

		try {
			const team = await DataStore.save(
				Team13.copyOf(originalteam, updated => {
					// throws TS error, as PK is immutable
					//@ts-expect-error
					updated.name = `name ${Date.now()}`;
				})
			);

			console.log('team updated:', team);
		} catch (error) {
			console.error('Save failed:', error);
		}
	}

	// Delete
	async function deleteTeam13() {
		clearQueryState();
		const [team] = await DataStore.query(Team13);
		if (!team) return;
		await DataStore.delete(team);
	}

	// Does not apply: Delete by PK (SK is present)

	// Delete by PK Predicate
	async function deleteTeam13ByPkPredicate() {
		clearQueryState();
		const [team] = await DataStore.query(Team13);
		if (!team) return;

		await DataStore.delete(Team13, c =>
			c.id('eq', team.id)
		);
	}

	// Does not apply: Delete by PK OL

	// Delete by PK + SK Predicate
	async function deleteTeam13ByPkSkPredicate() {
		clearQueryState();
		const [team] = await DataStore.query(Team13);
		if (!team) return;

		await DataStore.delete(Team13, c =>
			c.id('eq', team.id).name('eq', team.name)
		);
	}

	// Does not apply: Delete by PK + Multi SK Predicate

	// Delete by PK + SK OL
	// async function deleteTeam13ByPkSkOL() {
	// 	clearQueryState();
	// 	const [team] = await DataStore.query(Team13);
	// 	if (!team) return;
	// 	await DataStore.delete(Team13, {
	// 		id: team.id,
	// 		name: team.name,
	// 	});
	// }

	//#endregion

	//#region Delete ALL

	function deleteAll() {
		DataStore.delete(Project13, Predicates.ALL);
		DataStore.delete(Team13, Predicates.ALL);
	}

	//#endregion

	//#region Team13 Relational CRUD
	// Query by PK filter
	// async function getCurrentProjectTeam13sByPkFilter() {
	// 	clearQueryState();
	// 	const projects = (await DataStore.query(Team13)).filter(
	// 		c => c.team13Projectid === currentProject.id
	// 	);
	// 	setProject13s(projects);
	// 	console.log('Project13s', projects);
	// }

	// // Query by PK + SK filter
	// async function getCurrentProjectTeam13sByPkSkFilter() {
	// 	clearQueryState();
	// 	if (!currentTeam) return;
	// 	const projects = (await DataStore.query(Team13)).filter(
	// 		c =>
	// 			c.team13Projectid === currentProject.id &&
	// 			c.team13ProjectName === currentProject.name
	// 	);
	// 	setProject13s(projects);
	// 	console.log('Project13s', projects);
	// }

	// Does not apply to relational query: Query by PK

	// Query by PK Predicate
	// async function getCurrentProjectTeam13ByPkPredicate() {
	// 	clearQueryState();
	// 	if (!currentTeam) return;
	// 	const project = await DataStore.query(Team13, c =>
	// 		c.team13Projectid('eq', currentProject.id)
	// 	);
	// 	console.log('by PK Predicate', project);
	// 	setProject13s(project);
	// }

	// // Query by PK + SK Predicate
	// async function getCurrentProjectTeam13sbyPKSKPredicate() {
	// 	clearQueryState();
	// 	if (!currentTeam) return;
	// 	const project = await DataStore.query(Team13, c =>
	// 		c
	// 			.team13Projectid('eq', currentProject.id)
	// 			.team13ProjectName('eq', currentProject.name)
	// 	);
	// 	console.log('by PK Predicate', project);
	// 	setProject13s(project);
	// }

	// Does not apply to relational model: Query by PK OL

	// Does not apply to relational model: Query by PK + SK OL

	// Does not apply to relational model: Query by ALL

	// Does not apply to relational model: Create

	// Does not apply to relational model: Update

	// N/A: Update PK: should throw TS error, as PK is immutableTS error, as PK is immutable

	// Does not apply to relational model: Delete

	// Does not apply to relational model: Delete by PK

	// Delete by PK Predicate
	// async function deleteCurrentProjectTeam13ByPkPredicate() {
	// 	clearQueryState();
	// 	const [project] = await DataStore.query(Team13);
	// 	if (!project) return;

	// 	await DataStore.delete(Team13, c =>
	// 		c.team13Projectid('eq', currentProject.id)
	// 	);
	// }

	// // Does not apply to relational model: Delete by PK OL

	// // Delete by PK + SK Predicate
	// async function deleteCurrentProjectTeam13ByPkSkPredicate() {
	// 	clearQueryState();
	// 	const [project] = await DataStore.query(Team13);
	// 	if (!project) return;
	// 	// await DataStore.delete(Project, project.id);
	// 	await DataStore.delete(Team13, c =>
	// 		c
	// 			.team13Projectid('eq', currentProject.id)
	// 			.team13ProjectName('eq', currentProject.name)
	// 	);
	// }

	// Does not apply: Delete by PK + Multi SK Predicate

	// Does not apply to relational model: Delete by PK + SK OL

	//#endregion

	return (
		<div className="App">
			<header className="App-header">
				<h1>1.2.b Has one - bidirectional - with id, no CPK</h1>
				<p>{`Current team: ${currentTeam}`}</p>
				<p>DS</p>
				<div className="buttons">
					<button
						data-test="datastore-start"
						onClick={() => {
							DataStore.start();
							initSubs();
						}}
					>
						Start
					</button>
					<button onClick={() => DataStore.stop()}>Stop</button>
					<button data-test="datastore-clear" onClick={() => DataStore.clear()}>
						Clear
					</button>
					<button
						onClick={deleteAll}
						data-test="datastore-delete-all"
						style={{ backgroundColor: 'red' }}
					>
						Delete All Records
					</button>
					<button onClick={() => clearQueryState()}>Clear component state</button>
				</div>

				<span>Team13:</span>
				<div className="buttons">
					<button data-test="datastore-query-1" onClick={getTeam13s}>
						Query
					</button>
					<button onClick={getTeam13s}>Query by PK</button>
					<button onClick={getTeam13ByPkPredicate}>Query by PK Pred</button>
					<button onClick={getTeam13sbyPKSKPredicate}>
						Query by PK + SK Predicate
					</button>
					{/* <button disabled>Query by PK OL</button> */}
					{/* <button onClick={getTeam13sbyPkSkOl}>Query by PK + SK OL</button> */}
					<button onClick={getTeam13ByAll}>Query by ALL</button>
					<button onClick={createTeam13} data-test="datastore-create-1">
						Create
					</button>
					<button onClick={updateTeam13} data-test="datastore-update-1">
						Update Last
					</button>
					<button onClick={updateTeam13Pk} data-test="datastore-update-1">
						Update Last by PK
					</button>
					<button onClick={deleteTeam13} data-test="datastore-delete-1">
						Delete Last
					</button>
					<button disabled>Delete by PK</button>
					<button onClick={deleteTeam13ByPkPredicate}>Delete by PK Pred</button>
					{/* <button disabled>Delete by PK OL</button> */}
					<button onClick={deleteTeam13ByPkSkPredicate}>
						Delete by PK + SK Pred
					</button>
					{/* <button onClick={deleteTeam13ByPkSkOL}>Delete by PK + SK OL</button> */}
				</div>
				<span>Project13 relational operations:</span>
				<div className="buttons">
					<button
						disabled={!currentTeam}
						onClick={getCurrentTeamProject13sByPkFilter}
					>
						get Proj for Cur. Team - PkFilter
					</button>
					<button
						disabled={!currentTeam}
						onClick={getCurrentTeamProject13sByPkSkFilter}
					>
						get Proj for Cur. Team - PkSkFilter
					</button>
					<button
						disabled={!currentTeam}
						onClick={getCurrentTeamProject13ByPkPredicate}
					>
						get Proj for Cur. Team - PkPredicate
					</button>
					<button
						disabled={!currentTeam}
						onClick={getCurrentTeamProject13sbyPKSKPredicate}
					>
						get Proj for Cur. Team - PkSkPredicate
					</button>
					<button disabled onClick={deleteCurrentTeamProject13ByPkPredicate}>
						Del Proj for Cur. Team - PkPred
					</button>
					<button
						disabled={!currentTeam}
						onClick={deleteCurrentTeamProject13ByPkSkPredicate}
					>
						Del Proj for Cur. Team - PkSkPred
					</button>
				</div>
				<span>Team13 relational operations:</span>
				<div className="buttons">
					<button
						disabled={!currentProject}
						onClick={getCurrentTeamProject13sByPkFilter}
					>
						get Team for Cur. Proj - PkFilter
					</button>
					<button
						disabled={!currentProject}
						onClick={getCurrentTeamProject13sByPkSkFilter}
					>
						get Team for Cur. Proj - PkSkFilter
					</button>
					<button
						disabled={!currentProject}
						onClick={getCurrentTeamProject13ByPkPredicate}
					>
						get Team for Cur. Proj - PkPredicate
					</button>
					<button
						disabled={!currentProject}
						onClick={getCurrentTeamProject13sbyPKSKPredicate}
					>
						get Team for Cur. Proj - PkSkPredicate
					</button>
					<button disabled onClick={deleteCurrentTeamProject13ByPkPredicate}>
						Del Team for Cur. Proj - PkPred
					</button>
					<button
						disabled={!currentProject}
						onClick={deleteCurrentTeamProject13ByPkSkPredicate}
					>
						Del Team for Cur. Proj - PkSkPred
					</button>
				</div>
				<span>Independent Project13 operations:</span>
				<div className="buttons">
					<button data-test="datastore-query-1" onClick={getProject13s}>
						Query
					</button>
					<button onClick={getProject13s}>Query by PK</button>
					<button onClick={getProject13ByPkPredicate}>Query by PK Pred</button>
					<button onClick={getProject13sbyPKSKPredicate}>
						Query by PK + SK Predicate
					</button>
					{/* <button disabled>Query by PK OL</button> */}
					{/* <button onClick={getProject13sbyPkSkOl}>Query by PK + SK OL</button> */}
					<button onClick={getProject13ByAll}>Query by ALL</button>
					<button
						disabled={!currentTeam}
						onClick={createProjectForCurrentTeam13WithKeys}
						data-test="datastore-create-1"
					>
						Create (Cur. Team) w/ keys
					</button>
					<button
						disabled={!currentTeam}
						onClick={createProjectForCurrentTeam13WithInstance}
						data-test="datastore-create-1"
					>
						Create (Cur. Team) w/ instance
					</button>
					<button onClick={updateProject13} data-test="datastore-update-1">
						Update Last
					</button>
					<button onClick={updateProject13Pk} data-test="datastore-update-1">
						Update Last by PK
					</button>
					<button onClick={deleteProject13} data-test="datastore-delete-1">
						Delete Last
					</button>
					<button disabled>Delete by PK</button>
					<button onClick={deleteProject13ByPkPredicate}>
						Delete by PK Pred
					</button>
					{/* <button disabled>Delete by PK OL</button> */}
					<button onClick={deleteProject13ByPkSkPredicate}>
						Delete by PK + SK Pred
					</button>
					{/* <button onClick={deleteProject13ByPkSkOL}>
						Delete by PK + SK OL
					</button> */}
				</div>
				<div className="container">
					<div className="section">
						<pre>
							<span>Team13:</span>

							<pre data-test="datastore-output-3">
								{JSON.stringify(team13s, null, 2)}
							</pre>
						</pre>
					</div>
					<div className="section">
						<pre>
							<span>Project13:</span>
							<pre data-test="datastore-output-2">
								{JSON.stringify(project13s, null, 2)}
							</pre>
						</pre>
					</div>
				</div>
				<pre>
					<span>Observe Subscription Messages:</span>
					<pre data-test="datastore-output-1">
						{JSON.stringify(subMsg, null, 2)}
					</pre>
				</pre>
				<pre>
					<span>ObserveQuery Subscription Messages:</span>
					<pre data-test="datastore-output-1">
						{JSON.stringify(snapshots, null, 2)}
					</pre>
				</pre>
				<pre>
					<span>ObserveQuery Filtered Subscription Messages:</span>
					<pre data-test="datastore-output-1">
						{JSON.stringify(filteredSnapshots, null, 2)}
					</pre>
				</pre>
			</header>
		</div>
	);
}

export default App;
