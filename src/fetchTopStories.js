export default async function fetchTopStories() {
  const raw = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const res = await raw.json();
  return res.slice(0, 10);
}
