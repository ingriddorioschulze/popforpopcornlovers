import React from "react";
import { shallow } from "enzyme";
import App from "./app";
import axios from "./axios";

jest.mock("./axios");

test("app sets state", async () => {
    axios.get.mockResolvedValue({
        data: {
            id: 1,
            firstname: "Funky",
            lastname: "Chicken",
            image: "/funky.png",
            bio: "You are the best"
        }
    });
    const wrapper = shallow(<App />, {
        disableLifecycleMethods: true
    });
    await wrapper.instance().componentDidMount();

    expect(wrapper.state("id")).toBe(1);

    expect(wrapper.state("firstname")).toBe("Funky");

    expect(wrapper.state("lastname")).toBe("Chicken");

    expect(wrapper.state("image")).toBe("/funky.png");

    expect(wrapper.state("bio")).toBe("bio");
});
