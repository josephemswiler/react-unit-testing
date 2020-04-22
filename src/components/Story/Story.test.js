import { act, cleanup, render } from "@testing-library/react";

import React from "react";
import Story from "./Story";
import axios from "axios";
import { fetchStoryRes } from "../../utils/mocks";

jest.mock("axios");

afterEach(() => {
  cleanup();
  axios.mockReset();
});

test("loading state is displayed before aysnc tick, elements are displayed correctly after", async () => {
  // Assert the number of assertions to ensure all assertions run.
  // This is helpful for ensuring async functions resolve for jest.
  expect.assertions(6);

  act(() => {
    axios.get.mockResolvedValue(fetchStoryRes); // wrap calls that cause state updates in act()
  });

  const { getByTestId, findByTestId } = render(<Story id={0} fuzzy={""} />); // getByTestId throws error if elements match > 1 || elements match === 0

  // If an element is not loaded async, do not await it
  expect(
    getByTestId("9d8c7a6a-3346-4a04-a557-f4f2316cb3e0")
  ).toBeInTheDocument();

  // If rendering a component with side effects, await something so that state is updated while test is running
  const containerRender = await findByTestId(
    "d5bedcfd-4c32-4c0e-9c41-e8997a5c4f50"
  );
  expect(containerRender).toBeInTheDocument();

  const titleRender = await findByTestId(
    "3989255b-4fbb-4d68-b6d6-a6708dacb516"
  );
  expect(titleRender).toHaveTextContent("GitHub Is Degraded/Down");

  const dateRender = await findByTestId("2cfde5eb-8219-4e8b-8dc5-18fe1f96fe87");
  expect(dateRender).toHaveTextContent("Tue Apr 21 2020");

  const anchorRender = await findByTestId(
    "68ca3ed9-77b0-4812-a159-b90a9dec79d2"
  );
  expect(anchorRender.attributes.href.value).toEqual(
    "https://githubstatus.com/"
  );

  expect(axios.get).toBeCalledTimes(1); // Make sure the API call was only made once for one render.
});
