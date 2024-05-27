import type { MetaFunction } from "@remix-run/node";

// import { Link } from "@remix-run/react";
import AccomodationList from "~/features/accommodation/accommodation-list";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  // const user = useOptionalUser();
  return (
    <>
      <h1>Helooo</h1>
      <AccomodationList />
    </>
  );
}
