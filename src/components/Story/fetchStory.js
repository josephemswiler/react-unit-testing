export default async function fetchData(id) {
  const raw = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  return raw.json();
}
