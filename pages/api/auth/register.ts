import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, first_name, last_name, role } = req.body;
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    res.status(400).send("User already exists");
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10),
        first_name,
        last_name,
        role: "ADMIN",
      },
    });
    res.status(200).json(user);
  }
}
