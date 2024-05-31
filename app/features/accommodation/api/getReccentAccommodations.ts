import { LoaderFunction } from "@remix-run/node";

import { prisma } from "~/db.server";

export const loader: LoaderFunction = async () => {
  const accommodations = await prisma.accommodation.findMany();
  return accommodations;
};
