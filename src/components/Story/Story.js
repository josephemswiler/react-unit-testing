import React from "react";
import fetchStory from "./fetchStory";
import styled from "@emotion/styled";

export default function Story(props) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetchStory(props.id).then((res) => setData(res));
  }, [props.id]);
  return !data ? (
    <Loading data-testid="9d8c7a6a-3346-4a04-a557-f4f2316cb3e0" />
  ) : (
    <Card
      data-testid="d5bedcfd-4c32-4c0e-9c41-e8997a5c4f50"
      display={
        data.title.toLowerCase().includes(props.fuzzy.toLowerCase())
          ? "grid"
          : "none"
      }
    >
      <div data-testid="3989255b-4fbb-4d68-b6d6-a6708dacb516">{data.title}</div>
      <Time data-testid="2cfde5eb-8219-4e8b-8dc5-18fe1f96fe87">
        {new Date(data.time * 1000).toDateString()}
      </Time>
      <Anchor
        data-testid="68ca3ed9-77b0-4812-a159-b90a9dec79d2"
        href={data.url}
      >
        Read
      </Anchor>
    </Card>
  );
}

const Loading = styled.div`
  height: 63px;
  background: grey;
`;

const Card = styled.div`
  ${({ display }) => `display: ${display}`};
  grid: auto-flow / 1fr auto;
  grid-gap: 10px;
  padding: 10px;
  border: 1px grey solid;
  &:hover {
    background: #eee;
  }
`;

const Time = styled.div`
  font-size: 11px;
  color: grey;
`;

const Anchor = styled.a`
  font-size: 11px;
`;
