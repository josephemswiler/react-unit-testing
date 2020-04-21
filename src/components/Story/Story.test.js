import { act, cleanup, render, waitForElement } from "@testing-library/react";

import React from "react";
import Story from "./Story";
import fetchStory from "./fetchStory";

afterEach(() => {
  cleanup();
  fetchStory.mockReset();
});

test("with no props.id, loading state is displayed", () => {
  const { getByTestId } = render(<Story id={null} />);
  expect(
    getByTestId("9d8c7a6a-3346-4a04-a557-f4f2316cb3e0")
  ).toBeInTheDocument();
});

jest.mock("./fetchStory");

const res = {
  by: "juancampa",
  descendants: 107,
  id: 22935941,
  kids: [
    22935985,
    22936119,
    22936256,
    22936057,
    22936103,
    22936273,
    22936241,
    22936417,
    22936288,
    22936316,
  ],
  score: 205,
  time: 1587483712,
  title: "GitHub Is Degraded/Down",
  type: "story",
  url: "https://githubstatus.com/",
};

test("render <Story /> from fetchStory response", async () => {
  act(() => {
    fetchStory.mockResolvedValue(res);
  });

  const { getByTestId } = render(<Story id={22935941} fuzzy={""} />);

  const titleRender = await waitForElement(() =>
    getByTestId("3989255b-4fbb-4d68-b6d6-a6708dacb516")
  );
  const timeRender = await waitForElement(() =>
    getByTestId("2cfde5eb-8219-4e8b-8dc5-18fe1f96fe87")
  );
  const anchorRender = await waitForElement(() =>
    getByTestId("68ca3ed9-77b0-4812-a159-b90a9dec79d2")
  );

  expect(titleRender).toHaveTextContent("GitHub Is Degraded/Down");
  expect(timeRender).toHaveTextContent("Tue Apr 21 2020");
  expect(anchorRender.attributes.href.value).toEqual(
    "https://githubstatus.com/"
  );
});
