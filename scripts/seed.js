import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

async function main() {
  const NUM_STUDY_TO_CREATE = 5; // 생성 스터디 수
  console.log('🌱 시딩 시작... ');
}

const mickeyImage = 'src/assets/images/background/mikey-harris.jpg';
const chrisImage = 'src/assets/images/background/chris-lee.jpg';
const andrewImage = 'src/assets/images/background/andrew-ridley.jpg';
const alvaroImage = 'src/assets/images/background/alvaro-reyes.jpg';
const mikeyThumbnail = 'src/assets/images/thumbnail/mikey-harris-unsplash.png';
const chrisThumbnail = 'src/assets/images/thumbnail/chris-lee-unsplash.png';
const andrewThumbnail =
  'src/assets/images/thumbnail/andrew-ridley-unsplash.png';
const alvaroThumbnail = 'src/assets/images/thumbnail/alvaro-reyes-unsplash.png';

const backgroundList = [
  {
    type: 'bg',
    value: 'var(--card--green)',
    image: 'var(--card--green)',
  },
  {
    type: 'bg',
    value: 'var(--card--yellow)',
    image: 'var(--card--yellow)',
  },
  {
    type: 'bg',
    value: 'var(--card--blue)',
    image: 'var(--card--blue)',
  },
  {
    type: 'bg',
    value: 'var(--card--pink)',
    image: 'var(--card--pink)',
  },
  {
    type: 'img',
    value: mikeyThumbnail,
    image: 'src/assets/images/background/mikey-harris.jpg',
  },
  { type: 'img', value: chrisThumbnail, image: chrisImage },
  { type: 'img', value: andrewThumbnail, image: andrewImage },
  { type: 'img', value: alvaroThumbnail, image: alvaroImage },
];

// 랜덤 스터디 생성
const studiesPromises = Array.from({ length: NUM_STUDY_TO_CREATE }).map(() =>
  prisma.study.create({
    data: {
      nickname: faker.person.fullName(),
      title: faker.string.sentence({ min: 3, max: 8 }),
      description: faker.lorem.paragraph(),
      password: '1234',
      background: backgroundList[faker.number.int(backgroundList.length)],
    },
  }),
);

const studies = await Promise.all(studiesPromises);
