import { act, cleanup, render, waitForElement } from "@testing-library/react";

import React from "react";
import Story from "./Story";
import axios from "axios";

jest.mock("axios");

afterEach(() => {
  cleanup();
  axios.mockReset();
});

const res = {
  data: {
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
  },
};

test("loading state is displayed before aysnc tick, elements are displayed correctly after", async () => {
  // Assert the number of assertions to ensure all assertions run.
  // This is helpful for ensuring async functions resolve for jest.
  expect.assertions(6);

  act(() => {
    axios.get.mockResolvedValue(res); // wrap calls that cause state updates in act()
  });

  const { getByTestId } = render(<Story id={0} fuzzy={""} />); // getByTestId throws error if elements match > 1 || elements match === 0

  expect(
    getByTestId("9d8c7a6a-3346-4a04-a557-f4f2316cb3e0")
  ).toBeInTheDocument();

  // If rendering a component with side effects, await something so that state is updated while test is running
  const containerRender = await waitForElement(() =>
    getByTestId("d5bedcfd-4c32-4c0e-9c41-e8997a5c4f50")
  );
  expect(containerRender).toBeInTheDocument();

  const titleRender = await waitForElement(() =>
    getByTestId("3989255b-4fbb-4d68-b6d6-a6708dacb516")
  );
  expect(titleRender).toHaveTextContent("GitHub Is Degraded/Down");

  const dateRender = await waitForElement(() =>
    getByTestId("2cfde5eb-8219-4e8b-8dc5-18fe1f96fe87")
  );
  expect(dateRender).toHaveTextContent("Tue Apr 21 2020");

  const anchorRender = await waitForElement(() =>
    getByTestId("68ca3ed9-77b0-4812-a159-b90a9dec79d2")
  );
  expect(anchorRender.attributes.href.value).toEqual(
    "https://githubstatus.com/"
  );

  expect(axios.get).toBeCalledTimes(1); // Make sure the API call was only made once for one render.
});
