
const api: string = process.env.NEXT_PUBLIC_MONDAY_API ?? "";
const auth: string = process.env.NEXT_PUBLIC_MONDAY_ACCESS_TOKEN ?? "";
const board: string = process.env.NEXT_PUBLIC_BOARD ?? "";

export const mondayOptions = {
    api,
    auth,
    board,
    headers: {
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": "Bearer " + auth
        },
    }

};

export const registerUserBody = (userData: any[]) => {
    const data = {
        query: `
				mutation ($boardId: Int!, $itemName: String!, $columnValues: JSON!) {
					create_item (
						board_id: $boardId,
						item_name: $itemName,
						column_values: $columnValues
					) {
						id
					}
				}
			`,
        variables: {
            boardId: Number(board),
            itemName: userData['name'],
            columnValues: JSON.stringify(userData.values)
        }
    };
    return JSON.stringify(data);
}



export const getUserBody = (userData: { values: { email: { email: any; }; }; }) => {
    const userID = userData.user_id;
    const data = {
        query: `
			query ($boardId: Int!) {  
				boards (ids: [$boardId]) {
					items ( newest_first: true, page: 1, ${userID ? 'ids:['+userID+']': ''}) {
						id
						name
							column_values {
							  id
                              value,
							  text,
						}
					} 
				}
	  		} 
		`,
        variables: {
            boardId: Number(board),
            userId: Number(userID)
        }
    };
    return JSON.stringify(data);
}
