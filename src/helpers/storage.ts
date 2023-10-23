const STORAGE_KEY_LAST_ARTICLE_ID = "lastArticleId";

export function getLastArticleId() {
  return localStorage.getItem(STORAGE_KEY_LAST_ARTICLE_ID);
}

export function saveLastArticleId(articleId: string) {
  localStorage.setItem(STORAGE_KEY_LAST_ARTICLE_ID, articleId);
}
