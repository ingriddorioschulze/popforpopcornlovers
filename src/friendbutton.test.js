import React from "react";
import { shallow } from "enzyme";
import FriendButton from "./friendbutton";
import axios from "./axios";

jest.mock("./axios");

test("clicking 'send friend request' sends correct ajax request", async () => {
    axios.get.mockResolvedValue({
        data: undefined
    });
    const wrapper = shallow(<FriendButton recipient={1} />, {
        disableLifecycleMethods: true
    });

    await wrapper.instance().componentDidMount();

    axios.post.mockResolvedValue({});
    wrapper.find(".send-friend-request").simulate("click");
    expect(axios.post).toHaveBeenCalledWith("/api/friend/1/send");
});

test("clicking 'unfriend' sends correct ajax request", async () => {
    axios.get.mockResolvedValue({
        data: {
            request_accepted: true
        }
    });
    const wrapper = shallow(<FriendButton recipient={1} />, {
        disableLifecycleMethods: true
    });

    await wrapper.instance().componentDidMount();

    axios.post.mockResolvedValue({});
    wrapper.find(".unfriend").simulate("click");
    expect(axios.post).toHaveBeenCalledWith("/api/friend/1/unfriend");
});

test("clicking 'cancel friend request' sends correct ajax request", async () => {
    axios.get.mockResolvedValue({
        data: {
            id_recipient: 1,
            request_accepted: false
        }
    });
    const wrapper = shallow(<FriendButton recipient={1} />, {
        disableLifecycleMethods: true
    });

    await wrapper.instance().componentDidMount();

    axios.post.mockResolvedValue({});
    wrapper.find(".cancel-friend-request").simulate("click");
    expect(axios.post).toHaveBeenCalledWith("/api/friend/1/cancel");
});

test("clicking 'accept friend request' sends correct ajax request", async () => {
    axios.get.mockResolvedValue({
        data: {
            request_accepted: false
        }
    });
    const wrapper = shallow(<FriendButton recipient={1} />, {
        disableLifecycleMethods: true
    });

    await wrapper.instance().componentDidMount();

    axios.post.mockResolvedValue({});
    wrapper.find(".accept-friend-request").simulate("click");
    expect(axios.post).toHaveBeenCalledWith("/api/friend/1/accept");
});
