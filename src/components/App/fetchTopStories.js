export default async function fetchTopStories() {
  const raw = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  return raw.json();
}
