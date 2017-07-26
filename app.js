const csv = require('json2csv');
const sentiment = require('sentiment');
const fs = require('fs');
const cats = require('./Category-Emoji.json');

const dataArray = cats.EmojiDataArray;

const res = {};
dataArray.forEach((category) => {
  const categoryTitle = category.CVDataTitle;
  const categoryEmojis = category.CVCategoryData.Data.split(',');
  res[categoryTitle] = [];

  categoryEmojis.forEach((e) => {
    let eSentiment = sentiment(e).score;

    if (eSentiment > 0) eSentiment = 1;
    else if (eSentiment < 0) eSentiment = -1;

    res[categoryTitle].push({
      emoji: e,
      sentiment: eSentiment,
    });
  });
  const result = csv({
    data: res[categoryTitle],
    fields: ['emoji', 'sentiment'],
  });
  fs.writeFileSync(`./csv/${categoryTitle}.csv`, result, 'utf-8');
});
