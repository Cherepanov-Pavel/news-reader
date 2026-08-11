export default defineEventHandler(async () => {
  return $fetch('https://www.mos.ru/api/newsfeed/v4/frontend/json/ru/articles');
});
