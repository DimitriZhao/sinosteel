export const SET_PROJECTS = 'SET_PROJECTS';
export const GET_PROJECTS = 'GET_PROJECTS';

export function setProjects(projects)
{
	return(
	{
		type: SET_PROJECTS,
		payload: projects
	})
}

export function getProjects()
{
	return(
	{
		type: GET_PROJECTS
	})
}

const initialState = 
{
	projects: []
}

export default function ProjectReducer(state = initialState, action)
{
	switch(action.type)
	{
		case SET_PROJECTS:
			return(
			{
				...state,
				projects: action.payload
			})

		default:
			return state
	}
}