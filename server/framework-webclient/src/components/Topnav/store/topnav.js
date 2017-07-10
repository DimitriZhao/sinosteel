export const SET_MODULES = "SET_MODULES";
export const GET_MODULES = "GET_MODULES";

export function setModules(modules)
{
	return
	{
		type: SET_MODULES,
		payload: modules
	}
}

export function getModules()
{
	return
	{
		type: GET_MODULES
	};
}

const initialState = 
{
	modules: []
}

export default function topnavReducer(state = initialState, action)
{
	switch(action.type)
	{
		case SET_MODULES:
			return
			{
				...state,
				modules = action.payload
			}

		case GET_MODULES:
			return modules

		default:
			return state
	}
}