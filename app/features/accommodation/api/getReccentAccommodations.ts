import { LoaderFunction } from "@remix-run/node";

import { prisma } from "~/db.server";

export const loader: LoaderFunction = async ({ params }) => {
  const accommodations = await prisma.accommodation.findMany();
  return accommodations;
};
