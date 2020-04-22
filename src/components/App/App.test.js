import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react";
import {
  fetchStoryRes,
  fetchTopStoryRes,
  fuzzyStoryRes,
} from "../../utils/mocks";

import App from "./App";
import React from "react";
import axios from "axios";

jest.mock("axios");

afterEach(() => {
  cleanup();
  axios.mockReset();
});

test("elements are displayed correctly from mocked response", async () => {
  expect.assertions(25);

  act(() => {
    axios.get
      .mockResolvedValue(fetchStoryRes) // resolved for calls >= 3
      .mockResolvedValueOnce(fetchTopStoryRes) // resolved first
      .mockResolvedValueOnce(fuzzyStoryRes); // resovled second
  });

  const { getByTestId, findAllByTestId, findAllByText, findByText } = render(
    <App />
  );

  expect(getByTestId("95797e4e-4641-4edb-a9a5-aab52d538822")).toHaveTextContent(
    "Top Stories"
  );

  expect(axios.get).toBeCalledTimes(1);

  const storyCardRender = await findAllByTestId(
    "d5bedcfd-4c32-4c0e-9c41-e8997a5c4f50"
  );

  await waitFor(() => {
    storyCardRender.forEach((item) => {
      expect(item).toBeInTheDocument(); // 10 assertions
    });
  });

  const gridRender = getByTestId("cfccaf1c-39b0-451c-bdbf-2be5ed33ef48");

  expect(gridRender.childElementCount).toEqual(10);

  const inputRender = getByTestId("71ee857b-87e1-4b39-a67d-3848abf3896c");
  const query =
    "Our data centers now work harder when the sun shines and wind blows";
  fireEvent.change(inputRender, { target: { value: query } });
  expect(inputRender.value).toEqual(query);

  const notFuzzy = await findAllByText("GitHub Is Degraded/Down");

  await waitFor(() => {
    notFuzzy.forEach((item) => {
      expect(item).not.toBeVisible(); // 9 assertions
    });
  });

  const fuzzyMatch = await findByText(query);
  expect(fuzzyMatch).toBeVisible();

  expect(axios.get).toBeCalledTimes(11);
});
