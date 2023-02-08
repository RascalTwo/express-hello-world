const axios = require('axios')

async function publish(channel, payload){
	const [username, password] = process.env.ABLY_PUBLISH_KEY.split(':')
	const response = await axios.post(`https://realtime.ably.io/channels/${channel}/messages`, payload, {
		auth: { username, password }
	})
	return response.data
}

module.exports = {
	publish
}