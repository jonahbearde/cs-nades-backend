import app from "./app"
import { connect } from "./db"
import dotenv from "dotenv"

dotenv.config()

const port = parseInt(process.env.PORT as string)

app.listen(port, async () => {
  await connect()
  console.log(`Listening in: http://localhost:${port}`)
})
