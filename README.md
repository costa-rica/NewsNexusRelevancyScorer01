# NewsNexusRelevancyScorer01

## Description

This is a Node.js script that scores articles based on their relevance to a set of keywords using the Hugging Face Transformers library. It uses keywords from an Excel file. The excel file is stored in the env variable PATH_TO_KEYWORDS_EXCEL_FILE.

- Uses the NewsNexus07 SQLite database.
- Fully offline — no calls to the Hugging Face API.
- Designed to scale to thousands of articles and hundreds of keywords.
- Part of the NewsNexus system of microservices.

## Installation

```bash
npm install
```

## .env

necessary variables:

```bash
NAME_DB=newsnexus07.db
PATH_DATABASE=/Users/nick/Documents/_databases/NewsNexus07/
PATH_TO_KEYWORDS_EXCEL_FILE=/Users/nick/Documents/_project_resources/NewsNexus07/utilities/relevancy_scorer/NewsNexusRelevancyScorerKeywords.xlsx
```

## model used

```bash
  const embedder = await pipeline(
    "feature-extraction",
    "Xenova/paraphrase-MiniLM-L6-v2"
  );
```
