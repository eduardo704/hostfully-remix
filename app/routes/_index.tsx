import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/db.server";

// import { Link } from "@remix-run/react";
import AccomodationList from "~/features/accommodation/accommodation-list";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const accommodations = await prisma.accommodation.findMany({
    include: { images: true, location: true, reviews: true },
  });

  return { accommodations };
};

export default function Index() {
  const {accommodations} = useLoaderData<typeof loader>();

  console.log(accommodations);

  return (
  
    
      <AccomodationList accommodations={accommodations} />

  );
}
