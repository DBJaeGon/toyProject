'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('users', [
      {
        firstName: '01',
        lastName: 'user',
        email: 'uesr01@gmail.com',
        password: 'user0001',
        token: '',
        createdAt: new Date()
      },
      {
        firstName: '02',
        lastName: 'user',
        email: 'uesr02@gmail.com',
        password: 'user0002',
        token: '',
        createdAt: new Date()
      },
      {
        firstName: '03',
        lastName: 'user',
        email: 'uesr03@gmail.com',
        password: 'user0003',
        userImage: 'userImage03',
        token: '',
        createdAt: new Date()
    },{
      firstName: '04',
      lastName: 'user',
      email: 'uesr04gmailcom',
      password: 'user0004',
      token: '',
      createdAt: new Date()
    },{
        firstName: '05',
        lastName: 'user',
        email: 'uesr05@gmail.com',
        password: 'user05',
        token: '',
        createdAt: new Date()
      }
    ], { validate: true});

    const users = await queryInterface.sequelize.query('SELECT * from users');
    const usersRow = users[0];
    // console.log(usersRow)
    await queryInterface.bulkInsert('contents',[
      {
        title: 'title01-01',
        userId: usersRow[0].id,
        content: 'content01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'title01-02',
        userId: usersRow[0].id,
        content: 'content01-02',
        image: 'image01-02',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'title02-01',
        userId: usersRow[1].id,
        content: 'content02-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'title03-01',
        userId: usersRow[2].id,
        content: 'content03-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'title03-02',
        userId: usersRow[2].id,
        content: 'content03-02',
        image: 'image03-02',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], { validate: true});

    const contents = await queryInterface.sequelize.query('SELECT * from contents');
    const contentsRow = contents[0];

    return queryInterface.bulkInsert('comments', [
      {
        contentId: contentsRow[0].id,
        userId: usersRow[1].id,
        comment: `${contentsRow[0].title} - ${usersRow[1].email}`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        contentId: contentsRow[0].id,
        userId: usersRow[2].id,
        comment: `${contentsRow[0].title} - ${usersRow[2].email}`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        contentId: contentsRow[0].id,
        userId: usersRow[3].id,
        comment: `${contentsRow[0].title} - ${usersRow[3].email}`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        contentId: contentsRow[1].id,
        userId: usersRow[1].id,
        comment: `${contentsRow[1].title} - ${usersRow[1].email}`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        contentId: contentsRow[2].id,
        userId: usersRow[0].id,
        comment: `${contentsRow[2].title} - ${usersRow[0].email}`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        contentId: contentsRow[3].id,
        userId: usersRow[1].id,
        comment: `${contentsRow[3].title} - ${usersRow[1].email}`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        contentId: contentsRow[4].id,
        userId: usersRow[0].id,
        comment: `${contentsRow[4].title} - ${usersRow[0].email}`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
    await queryInterface.bulkDelete('contents', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
