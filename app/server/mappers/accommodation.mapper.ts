import { Prisma, Accommodation as PrismaAcc } from "@prisma/client";
import invariant from "tiny-invariant";
import { Accommodation } from "~/models/accommodation.model";

export function prismaAccToFrontAcc(accFigma: FullAccommodation): Accommodation {
  invariant(accFigma.images);
  invariant(accFigma.location);
  invariant(accFigma.reviews);
  return {
    id: accFigma.id,
    createdAt: accFigma.createdAt,
    updatedAt: accFigma.createdAt,
    price: accFigma.price,
    userId: accFigma.userId,
    images: accFigma.images,
    level: accFigma.level,
    location: accFigma.location,
    reviews: accFigma.reviews,
  };
}

// import { Prisma } from '@prisma/client'

// 1: Define a type that includes the relation to `Post`
const fullAccommodations = Prisma.validator<Prisma.AccommodationArgs>()({
  include: { images: true, location: true, reviews: true },
});

// // 2: Define a type that only contains a subset of the scalar fields
// const userPersonalData = Prisma.validator<Prisma.UserDefaultArgs>()({
//   select: { email: true, name: true },
// })

// 3: This type will include a user and all their posts
export type FullAccommodation = Prisma.AccommodationGetPayload<
  typeof fullAccommodations
>;
