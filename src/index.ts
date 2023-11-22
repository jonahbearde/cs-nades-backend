import app from "./app"
import { connect } from "./db"
import dotenv from "dotenv"
import { writeLocs } from "./helpers/writeLocs"

dotenv.config()

const port = parseInt(process.env.PORT as string)

app.listen(port, async () => {
	await connect()
	// await writeLocs()
  console.log(`Listening in: http://localhost:${port}`)
})
