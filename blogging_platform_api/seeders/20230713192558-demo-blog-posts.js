'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Junyao",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    const users = await queryInterface.sequelize.query(`SELECT id FROM users`);

    const userId = users[0][0].id;
    
    await queryInterface.bulkInsert('blog_posts', [{
      title: "Dynamic Loose Learning (DLL)",
      contents:"Dashwood contempt on mr unlocked resolved provided of of. Stanhill wondered it it welcomed oh. Hundred no prudent he however smiling at an offence. If earnestly extremity he he propriety something admitting convinced ye. Pleasant in to although as if differed horrible. Mirth his quick its set front enjoy hoped had there. Who connection imprudence middletons too but increasing celebrated principles joy. Herself too improve gay winding ask expense are compact. New all paid few hard pure she.",
      post_date: new Date("2023-06-17"),
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      title: "impossible understood age",
      contents: "She suspicion dejection saw instantly. Well deny may real one told yet saw hard dear. Bed chief house rapid right the. Set noisy one state tears which. No girl oh part must fact high my he. Simplicity in excellence melancholy as remarkably discovered. Own partiality motionless was old excellence she inquietude contrasted. Sister giving so wicket cousin of an he rather marked. Of on game part body rich. Adapted mr savings venture it or comfort affixed friends.",
      post_date: new Date("2023-06-24"),
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      title: "cottage",
      contents:"Greatly cottage thought fortune no mention he. Of mr certainty arranging am smallness by conveying. Him plate you allow built grave. Sigh sang nay sex high yet door game. She dissimilar was favourable unreserved nay expression contrasted saw. Past her find she like bore pain open. Shy lose need eyes son not shot. Jennings removing are his eat dashwood. Middleton as pretended listening he smallness perceived. Now his but two green spoil drift.",
      post_date: new Date("2023-06-20"),
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('blog_posts', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
