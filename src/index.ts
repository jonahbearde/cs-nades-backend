import app from "./app"
import { connect } from "./db"
import { writeLocs } from "./helpers/writeLocs"

require('dotenv').config()

const port = parseInt(process.env.PORT as string)

app.listen(port, async () => {
	await connect()
	// pre-release function
	// await writeLocs()
  console.log(`Listening on: http://localhost:${port}`)
})
