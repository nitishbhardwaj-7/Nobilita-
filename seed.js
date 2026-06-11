const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  let page = await prisma.page.findUnique({where: {slug: 'home'}});
  if (!page) {
    await prisma.page.create({
      data: {
        title: 'Homepage',
        slug: 'home',
        pageType: 'HOME',
        status: 'PUBLISHED',
        sections: [{}]
      }
    });
    console.log('Created homepage');
  } else {
    console.log('Homepage exists');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
