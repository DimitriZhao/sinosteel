export const SET_MODULES = "SET_MODULES"

export function setModules(modules)
{
	return(
	{
		type: SET_MODULES,
		payload: modules
	})
}

const initialState = 
{
	modules: []
}

export default function CoreLayoutReducer(state = initialState, action)
{
	switch(action.type)
	{
		case SET_MODULES:
			return(
			{
				...state,
				modules: action.payload
			})

		default:
			return state
	}
}