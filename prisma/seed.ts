import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import { UnsplashResponse } from "~/models/unsplash";

const prisma = new PrismaClient();

async function seed() {
  const email = "eduardo704@gmail.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });
  const hashedPassword = await bcrypt.hash("edu12345", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });


  await generateAccomodations(user);
}

async function generateAccomodations(user: any) {
  // const pictures = await getSurfPictures();
  // console.log(pictures)

  const locations = [
    {
      country: "United States",
      name: "California House",
      lat: 32.715736,
      long: -117.161087,
    },
    {
      country: "Hawai",
      name: "Hawai Villa",
      lat: 19.896767,
      long: 155.582779,
    },
    {
      country: "Floiranopolis",
      name: "Florianopolis Hostel",
      lat: 27.59487,
      long: -48.548222,
    },
  ];

  for (let index = 0; index < 20; index++) {
    const level = generateLevel();
    const picture =
      "https://images.unsplash.com/photo-1585567512124-dbfaa0e7eee5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTg2NTF8MHwxfHNlYXJjaHwxfHxzdXJmJTIwaG91c2V8ZW58MHwyfHx8MTcwNjIwOTYxNnww&ixlib=rb-4.0.3&q=85";
    // const picture =
      // pictures[faker.number.int({ min: 0, max: pictures.length - 1 })] ||
      // "https://images.unsplash.com/photo-1585567512124-dbfaa0e7eee5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NTg2NTF8MHwxfHNlYXJjaHwxfHxzdXJmJTIwaG91c2V8ZW58MHwyfHx8MTcwNjIwOTYxNnww&ixlib=rb-4.0.3&q=85";
    await prisma.accommodation.create({
      data: {
        level,
        price: faker.number.int({ min: 100, max: 500 }),
        userId: user.id,
        reviews: {
          create: {
            count: faker.number.int({ min: 100, max: 500 }),
            raiting: faker.number.float({
              min: 3,
              max: 5,
              fractionDigits: 2,
            }),
          },
        },
        images: {
          create: {
            src: picture,
          },
        },
        location: {
          create: { ...locations[faker.number.int({ min: 0, max: 2 })] },
        },
      },
    });
  }
}

function generateLevel() {
  const num = faker.number.int({ min: 0, max: 2 });
  const levelMap = ["Begginer", "Intermediate", "Advanced"];

  return levelMap[num];
}

// function generateAccommodation() {

// }

async function getSurfPictures() {
  const surf_url =
    "https://api.unsplash.com/search/photos/?client_id=w2NsK6LMfsyUBWJE6Hs8EIjpUzOF6apusIjgmIHK-XM&query=surf house&orientation=portrait";
  const response = await fetch(surf_url, {
    headers: { "Client-ID": "w2NsK6LMfsyUBWJE6Hs8EIjpUzOF6apusIjgmIHK-XM" },
  });
  const body = (await response.json()) as UnsplashResponse;
  return body.results.map((items) => {
    return items.urls.regular;
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
