import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUser } from './../../../utils/monday/monday';
import argon2 from 'argon2';

let userData = {}

const authOpttions: NextAuthOptions = {

	session: {
		strategy: 'jwt'
	},

	providers: [
		CredentialsProvider({
			type: 'credentials',
			credentials: {},
			async authorize(credentials, req) {

				if (req.method !== 'POST') {
					return;
				}

				const { email, password, name, role } = credentials as {
					name: string;
					email: string;
					password: string;
					role: string;
				};

				const user = { // Post monday api
					name, // Username
					values: {
						text2: password, // Password
						email: { email, text: email }, // Email
						status1: role
					}
				}

				const userMonday = await getUser(user).then(async (response) => {

					if (response) {
						const [data] = response;
						// Object user to return
						const { id, name } = data;

						const values = data && data.column_values && data.column_values.map((elem: { id: string; text: string; }) => {
							return { [elem.id]: elem.text }
						})

						const getUserDetails = () => {
							const { status1: role } = values[0]
							const { email } = values[1]
							return { role, email }
						}

						const loggedUser = {
							id,
							name,
							email: getUserDetails().email,
							userRole: getUserDetails().role
						}

						// Verify Password
						let pass = values && values.find((elem: { text2: string; }) =>
							elem.text2
						);

						try {
							if (await argon2.verify(pass.text2, password)) {
								return loggedUser;
							} 
							throw new Error("error")
						} catch (err) {
							// internal failure
							throw new Error(err)

						}

						return;

					}

					return null

				})
				userData = userMonday
				return userMonday;
			}
		})
	],
	pages: {
		signIn: "/login",
		newUser: "/register",
	},
	callbacks: {
		// async session({ session, token, user }) {
		// 	session?.user?.role = userData?.userRole; // Add role value to user object so it is passed along with session
		// 	return session;
		// }

	}

}

export default NextAuth(authOpttions)