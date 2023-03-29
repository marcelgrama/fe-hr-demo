
import axios from "axios";
import { mondayOptions, registerUserBody, getUserBody } from './mondayOptions';

const { api, headers } = mondayOptions;

export const registerUser = async (user: any) => {
	const response = await axios.post(
		api,
		registerUserBody(user),
		headers
	)
}

export const getUser = async (user: any) => {
	const response = await axios.post(
		api,
		getUserBody(user),
		headers
	).then(response => {
		const columns = response.data.data.boards[0].items;
		const userEmail = user.values.email.email;

		if (Array.isArray(columns) && columns.length > 0) {
			const data = columns.filter(column => {
				return column.column_values.some(elem => {
					return elem.text == userEmail
				})
			});
			return !data.length ? false : data

		} else {
			return false
		}
	}).catch(err => {
		return false
	})
	return response
}