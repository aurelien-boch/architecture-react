import React from "react";
import {render, screen} from "@testing-library/react";
import App from "../App";

test("renders learn react link", () => {
    render(<App/>); //must put app into a static router to set url
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
