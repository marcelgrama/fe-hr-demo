import { getUser } from "../../../utils/monday/monday"

const VerifyEmail = async (req: any, res: any) => {

	if (req.method === "POST") {
		const { data } = req.body;
		const { name, values: { email: { text: email } } } = data;
		if (!data) {
			return 'error';
		}

		await getUser(data)
			.then(async (response) => {
				if (response.length > 0) {
					// This means that email exists
					res.status(500).json({ message: 'Exists' });
				} else {
					res.status(200).json({ message: 'New Account' })
				}
			})
			.catch((error) => {
			})
	}
}

export default VerifyEmail;