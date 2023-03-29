import argon2 from 'argon2';
import { getUser, registerUser } from './../../../utils/monday/monday';

const registerHandler = async (req: any, res: any) => {

    if (req.method === "POST") {
        const { data } = req.body;
        const { name, values: { email: { text: email } } } = data;

        if (!data) {
            return 'error';
        }

        if (name && name.length > 20) {
            res.status(500).json({ message: 'Name is to long, max 20 characters' })
            return;
        }

        if (email && email.length > 100) {
            res.status(500).json({ message: 'Email is to long!' })
            return;
        }

        await argon2.hash(data.values.text2).then(password => {
            const user = {
                name,
                values: {
                    text2: password,
                    email: { email, text: email }
                }
            }

            return user
        }).then(async (user) => {

            const response = await getUser(user)
            return [response, user]
        }).then(async ([response, user]) => {
            if (!response) {
                await registerUser(user).then(response => {
                    res.status(200).json({ message: 'Account created succesfuly', data: response })

                }).catch(err => {
                    res.status(500).json({ message: `Please make sure you're credentials are correct`, error: err })

                });
            }
        }).catch(err => {
            throw new Error(err);
        });
    }

}

export default registerHandler