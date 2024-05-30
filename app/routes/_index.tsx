import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import AccomodationList from "~/features/accommodation/accommodation-list";
import { getAccommodations } from "~/server/accomodation.server";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export const loader = async () => {
  const accommodations = await getAccommodations();
  return { accommodations };
};

export default function Index() {
  const { accommodations } = useLoaderData<typeof loader>();

  return <AccomodationList accommodations={accommodations} />;
}
