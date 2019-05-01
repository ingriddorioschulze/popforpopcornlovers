import React from "react";
import { shallow } from "enzyme";
import BioEditor from "./bioeditor";
import axios from "./axios";

jest.mock("./axios");

test("no bio is passed to it, 'add' button is rendered", () => {
    const wrapper = shallow(<BioEditor bio="" setBio={jest.fn()} />, {});
    expect(wrapper.containsMatchingElement(<button>add bio</button>)).toBe(
        true
    );
});

test("a bio is passed to it, 'edit' button is rendered", () => {
    const wrapper = shallow(<BioEditor bio="bio" setBio={jest.fn()} />, {});
    expect(wrapper.containsMatchingElement(<button>edit</button>)).toBe(true);
});

test("clicking 'add' causes a textarea and 'save' button is rendered", () => {
    const wrapper = shallow(<BioEditor bio="" setBio={jest.fn()} />, {});
    wrapper.find(".bio-add-button").simulate("click");
    expect(wrapper.containsMatchingElement(<textarea />)).toBe(true);
    expect(wrapper.containsMatchingElement(<button>save</button>)).toBe(true);
});

test("clicking 'edit' causes a textarea and 'save' button is rendered", () => {
    const wrapper = shallow(<BioEditor bio="bio" setBio={jest.fn()} />, {});
    wrapper.find(".bio-edit-button").simulate("click");
    expect(wrapper.containsMatchingElement(<textarea />)).toBe(true);
    expect(wrapper.containsMatchingElement(<button>save</button>)).toBe(true);
});

test("clicking 'save' button causes an ajax request", async () => {
    const wrapper = shallow(<BioEditor bio="bio" setBio={jest.fn()} />, {});
    wrapper.find(".bio-edit-button").simulate("click");
    axios.put.mockResolvedValue({});
    wrapper.find(".bio-save-button").simulate("click");
    expect(axios.put).toHaveBeenCalledWith("/editbio", { bio: "bio" });
});

test("mock request is successful, function gets called", async () => {
    const setBio = jest.fn();
    const wrapper = shallow(<BioEditor bio="bio" setBio={setBio} />, {});
    wrapper.find(".bio-edit-button").simulate("click");
    axios.put.mockResolvedValue({});
    await wrapper.find(".bio-save-button").simulate("click");
    expect(setBio).toHaveBeenCalledWith("bio");
});
