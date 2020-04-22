import axios from "axios";

export default async function fetchTopStories() {
  const { data } = await axios.get(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  return data;
}
