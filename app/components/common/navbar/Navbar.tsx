import Container from "../layout/container";

import Logo from "./Logo";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm border-b-2">
      <div className="py-4">
        <Container>
          <div
            className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
          >
            <Logo />

            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
}
