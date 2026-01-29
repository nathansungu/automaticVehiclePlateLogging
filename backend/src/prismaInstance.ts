import  {PrismaClient} from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from 'pg'

const databaseUrl = process.env.DATABASE_URL || "postgresql://postgres:1234@localhost:5432/project"


const url = new URL(databaseUrl)

const pool = new Pool({
  host: url.hostname,
  port: parseInt(url.port),
  user: url.username,
  password: String(url.password), 
  database: url.pathname.slice(1),
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export default prisma
    
