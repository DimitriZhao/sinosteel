export const SET_SYS_USER = 'SET_SYS_USER';

export function setSysUser(sysUser)
{
	return(
	{
		type: SET_SYS_USER,
		payload: sysUser
	});
}

const initialState = 
{
	sysUser: {}
};

export default function LoginReducer(state = initialState, action)
{
	switch(action.type)
	{
		case SET_SYS_USER:
			return(
			{
				...state,
				sysUser: action.payload
			});

		default:
			return state;
	}
}