import axios from "axios";

export default async function fetchData(id) {
  const { data } = await axios.get(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );

  return data;
}
