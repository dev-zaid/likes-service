import config from '../config';
import database from './database';
import express from './express';
import Logger from './logger';
import Express from 'express';

export default async ({ expressApp }: { expressApp: Express.Application }): Promise<void> => {
  await database();
  Logger.info(`✌️ Connection to database successful`);

  await express({ app: expressApp });
  Logger.info('✌️ Express loaded');

  if ((await (await (await database()).collection('posts').find().toArray()).length) < 5) {
    await populatePosts();
  }
  Logger.info('✌️ Test data populated');

  Logger.info('Printing all Post ID...');
  const cursor = await (await database()).collection('posts').find();
  await cursor.forEach(document => {
    Logger.info(document._id);
  });

  Logger.info('✅ All modules loaded!');
};

async function populatePosts() {
  const testData = [
    { content: 'Lorem ipsum dolor sit amet' },
    { content: 'Consectetur adipiscing elit' },
    { content: 'Sed do eiusmod tempor incididunt' },
    { content: 'Ut labore et dolore magna aliqua' },
    { content: 'Ut enim ad minim veniam' },
  ];
  await (await database()).collection('posts').insertMany(testData);
}
