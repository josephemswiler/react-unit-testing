import React from "react";
import Story from "../Story/Story";
import fetchTopStories from "./fetchTopStories";
import styled from "@emotion/styled";

function App() {
  const [data, setData] = React.useState([]);
  const [fuzzy, setFuzzy] = React.useState("");

  const handleFuzzy = ({ target }) => setFuzzy(target.value);

  React.useEffect(() => {
    fetchTopStories().then((res) => setData(res.slice(0, 10)));
  }, []);

  return (
    <Container>
      <Toolbar>
        <h1 data-testid="95797e4e-4641-4edb-a9a5-aab52d538822">Top Stories</h1>
        <InputGroup>
          Fuzzy Title Search
          <input
            data-testid="71ee857b-87e1-4b39-a67d-3848abf3896c"
            value={fuzzy}
            onChange={handleFuzzy}
          />
        </InputGroup>
      </Toolbar>
      <Grid data-testid="cfccaf1c-39b0-451c-bdbf-2be5ed33ef48">
        {data.map((item) => (
          <Story key={`story-${item}`} id={item} fuzzy={fuzzy} />
        ))}
      </Grid>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: grid;
  grid: auto 1fr / auto-flow;
  padding: 20px;
`;

const Toolbar = styled.div`
  display: grid;
  grid: auto / auto auto;
  align-items: center;
`;

const InputGroup = styled.div`
  display: grid;
  grid: auto-flow / auto 1fr;
  grid-gap: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid: auto-flow / 1fr;
  grid-gap: 10px;
`;
