import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import AccomodationList from "~/features/accommodation/accommodation-list";
import { Accommodation } from "~/models/accommodation.model";
import { getAccommodations } from "~/server/accomodation.server";
import { prismaAccToFrontAcc } from "~/server/mappers/accommodation.mapper";

export const meta: MetaFunction = () => [{ title: "Hostfully App" }];

export const loader = async () => {
  const accommodations = (await getAccommodations()).map(prismaAccToFrontAcc);
  return { accommodations };
};

export default function Index() {
  const response = useLoaderData<typeof loader>();
  const accommodations: Accommodation[] = response.accommodations.map(
    (itens) => {
      return {
        ...itens,
        createdAt: new Date(itens.createdAt),
        updatedAt: new Date(itens.createdAt),
      };
    },
  );

  return <AccomodationList accommodations={accommodations} />;
}
