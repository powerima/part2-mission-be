import pkg from '@prisma/client';
import { fakerKO as faker } from '@faker-js/faker';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 시딩 시작...');

  const backgrounds = [
    'COLOR_GREEN',
    'COLOR_ORANGE',
    'COLOR_BLUE',
    'COLOR_PINK',
    'IMAGE_1',
    'IMAGE_2',
    'IMAGE_3',
    'IMAGE_4',
  ];

  // Study 생성
  const NUM_STUDY_TO_CREATE = 9; // Study 생성 개수
  const studyPromises = Array.from({ length: NUM_STUDY_TO_CREATE }).map(() =>
    prisma.study.create({
      data: {
        nickname: faker.person.firstName(),
        title: faker.lorem.words(2),
        description: faker.lorem.sentence(),
        background: backgrounds[Math.floor(Math.random() * backgrounds.length)],
        password: faker.internet.password(8),
        points: faker.number.int({ min: 0, max: 500 }),
      },
    }),
  );
  const studies = await Promise.all(studyPromises);

  // 각 study에 대한 Habit 생성
  const habits = [];
  for (const study of studies) {
    const habitCount = faker.number.int({ min: 1, max: 9 });
    const habitPromises = Array.from({ length: habitCount }).map(() =>
      prisma.habit.create({
        data: {
          studyId: study.id,
          name: faker.lorem.word(),
        },
      }),
    );

    const studyHabits = await Promise.all(habitPromises);
    habits.push(...studyHabits);
  }

  //각 Habit에 대한 HabitRecord 생성
  for (const habit of habits) {
    const WEEK = 7;
    const recordPromises = Array.from({ length: WEEK }).map((_, i) => {
      const recordDate = new Date();
      recordDate.setDate(recordDate.getDate() - i); // 오늘부터 -i일 전
      return prisma.habitRecord.create({
        data: {
          habitId: habit.id,
          recordDate,
        },
      });
    });

    await Promise.all(recordPromises);
  }

  // 각 Study에 대한 reaction 생성
  for (const study of studies) {
    const numReactions = faker.number.int({ min: 0, max: 5 });
    const reactionPromises = Array.from({ length: numReactions }).map(() =>
      prisma.reaction.create({
        data: {
          studyId: study.id,
          emoji: faker.internet.emoji(),
          count: faker.number.int({ min: 0, max: 30 }),
        },
      }),
    );

    await Promise.all(reactionPromises);
  }

  console.log(`✅ ${studies.length}개의 스터디가 생성되었습니다`);
  console.log('✅ 데이터 시딩 완료');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
