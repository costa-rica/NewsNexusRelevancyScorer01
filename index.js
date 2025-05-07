require("dotenv").config();
const {
  Article,
  EntityWhoCategorizedArticle,
  ArtificialIntelligence,
} = require("newsnexus07db");
const path = require("path");

// const { loadKeywordsFromExcel } = require("./modules/utilitiesKeywords");
const { scoreArticlesWithKeywords } = require("./modules/utilitiesScorer");
const { loadKeywordsFromExcel } = require("./modules/utilitiesExcel");
const { saveScoresToDatabase } = require("./modules/utilitiesSaver");

console.log("--- NewsNexus Relevancy Scorer 01 ---");

async function main() {
  const articles = await Article.findAll();
  console.log("Loaded articles:", articles.length);

  const aiModel = await ArtificialIntelligence.findOne({
    where: {
      name: "NewsNexusRelevancyScorer01",
      huggingFaceModelName: "Xenova/paraphrase-MiniLM-L6-v2",
      huggingFaceModelType: "feature-extraction",
    },
    include: [
      {
        model: EntityWhoCategorizedArticle,
        as: "EntityWhoCategorizedArticles",
      },
    ],
  });

  const entity = aiModel?.EntityWhoCategorizedArticles?.[0];
  const entityWhoCategorizesId = entity?.id;

  console.log("entityWhoCategorizesId:", entityWhoCategorizesId);

  const keywords = await loadKeywordsFromExcel(
    process.env.PATH_TO_KEYWORDS_EXCEL_FILE
  );
  console.log("Loaded keywords:", keywords.length);

  const scoredArticles = await scoreArticlesWithKeywords(articles, keywords);
  console.log("Scoring complete");

  await saveScoresToDatabase(scoredArticles, keywords, entityWhoCategorizesId);
}

main();
