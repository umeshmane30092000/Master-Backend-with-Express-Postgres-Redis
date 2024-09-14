// prisma client is used to connect with our database so can create single intance export form here
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(
  {
    log: ["error", "query"],
  }
);

export default prisma;