// modules/utilitiesSaver.js
const { ArticleEntityWhoCategorizedArticleContract } = require("newsnexus07db");

async function saveScoresToDatabase(
  scoredArticles,
  keywords,
  entityWhoCategorizesId
) {
  const entries = [];

  for (let article of scoredArticles) {
    for (let keyword of keywords) {
      const keywordRating = article.scores[keyword];
      if (typeof keywordRating === "number" && !isNaN(keywordRating)) {
        entries.push({
          articleId: article.id,
          entityWhoCategorizesId,
          keyword,
          keywordRating,
        });
      }
    }
  }

  try {
    // await ArticleEntityWhoCategorizedArticleContract.bulkCreate(entries);
    await ArticleEntityWhoCategorizedArticleContract.bulkCreate(entries, {
      updateOnDuplicate: ["keywordRating", "updatedAt"],
    });
    console.log(
      `✅ Successfully saved ${entries.length} keyword scores to the database.`
    );
  } catch (error) {
    console.error("❌ Error saving scores to database:", error);
  }
}

module.exports = {
  saveScoresToDatabase,
};
