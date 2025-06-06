import { PrismaClient, TradeStatus, Category } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  await prisma.commentLike.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.postLike.deleteMany();
  await prisma.postImage.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.neighborhood.deleteMany();

  const neighborhoodData = Array.from({ length: 3 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.location.city(),
    lat: Number(faker.location.latitude()),
    lng: Number(faker.location.longitude()),
  }));

  const neighborhoods = await Promise.all(
    neighborhoodData.map((n) => prisma.neighborhood.create({ data: n }))
  );

  const users = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.user.create({
        data: {
          id: faker.string.uuid(),
          email: faker.internet.email(),
          nickname: faker.internet.username(),
          neighborhoodId: faker.helpers.arrayElement(neighborhoods).id,
          isEmailVerified: true,
          emailVerifiedAt: faker.date.recent({ days: 10 }),
        },
      })
    )
  );

  const posts = [];
  for (let i = 0; i < 30; i++) {
    const author = faker.helpers.arrayElement(users);
    const category = faker.helpers.enumValue(Category);
    const status = faker.helpers.enumValue(TradeStatus);

    const post = await prisma.post.create({
      data: {
        id: faker.string.uuid(),
        title: faker.commerce.productName(),
        content: faker.lorem.paragraph(),
        price: faker.number.int({ min: 0, max: 500_000 }),
        category,
        status,
        authorId: author.id,
        neighborhoodId: author.neighborhoodId!,
        images: {
          create: Array.from({
            length: faker.number.int({ min: 1, max: 3 }),
          }).map((_, idx) => ({
            id: faker.string.uuid(),
            url: faker.image.urlPicsumPhotos({ width: 600, height: 600 }),
            order: idx,
          })),
        },
      },
      include: { images: true },
    });
    posts.push(post);
  }

  for (const post of posts) {
    const commentCount = faker.number.int({ min: 0, max: 5 });
    for (let i = 0; i < commentCount; i++) {
      const author = faker.helpers.arrayElement(users);
      await prisma.comment.create({
        data: {
          id: faker.string.uuid(),
          content: faker.lorem.sentence(),
          authorId: author.id,
          postId: post.id,
        },
      });
    }
  }

  for (const post of posts) {
    const likeUsers = faker.helpers.arrayElements(users, {
      min: 0,
      max: 10,
    });
    await prisma.postLike.createMany({
      data: likeUsers.map((u) => ({
        userId: u.id,
        postId: post.id,
      })),
      skipDuplicates: true,
    });
  }

  console.log("✅  Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
