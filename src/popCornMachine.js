import { keyframes, easing } from "popmotion";

const NUMBER = 35;
const MINIMUM_OFFSET_TOP = 70;
const VARIATION_OFFSET_TOP = 150;
const MINIMUM_OFFSET_SIDE = 150;
const VARIATION_OFFSET_SIDE = 500;
const NUMBER_OF_IMAGES = 5;
const MINIMUM_IMAGE_SIZE = 30;
const VARIATION_IMAGE_SIZE = 20;
const FINAL_LEVEL = 40;
const POP_AGAIN_DELAY = 2000;

const getDuration = h => h * 1.9;

function pop(kernel, i) {
    var height = document.documentElement.clientHeight;
    var scrollTop = document.documentElement.scrollTop;

    const duration = getDuration(height);
    var start = document.querySelector(".popcorn-machine-origin").offsetTop;
    var fromTop = Math.random() * VARIATION_OFFSET_TOP + MINIMUM_OFFSET_TOP;
    var leftRight = Math.random() > 0.5 ? 1 : -1;
    var toSide =
        (Math.random() * VARIATION_OFFSET_SIDE + MINIMUM_OFFSET_SIDE) *
        leftRight;

    keyframes({
        values: [
            [0, 0],
            [toSide / 2, -start + fromTop],
            [toSide, scrollTop + height - start - FINAL_LEVEL]
        ],
        times: [0, 0.3, 1],
        duration: duration,
        easings: easing.circIn
    }).start(v => {
        kernel.style.top = `${v[1]}px`;
        kernel.style.left = `${v[0]}px`;
    });

    const popAgain = Math.random() * POP_AGAIN_DELAY;
    timeouts[i] = setTimeout(() => pop(kernel, i), duration + popAgain);
}
const timeouts = new Array(NUMBER);

export function start() {
    const ORIGIN = document.querySelector(".popcorn-machine-origin");

    const kernels = [];
    for (let i = 0; i < NUMBER; i++) {
        const kernel = document.createElement("img");
        kernel.className = "kernel";
        const size = Math.random() * VARIATION_IMAGE_SIZE + MINIMUM_IMAGE_SIZE;
        const number = (i % NUMBER_OF_IMAGES) + 1;
        kernel.src = `popcorn${number}.png`;
        kernel.style.width = `${size}px`;
        kernel.style.height = `${size}px`;
        kernels.push(kernel);
        ORIGIN.append(kernel);
    }
    kernels.forEach((kernel, i) => {
        const start = Math.random() * 1000;
        timeouts[i] = setTimeout(() => pop(kernel, i), start);
    });
}

export function reset() {
    timeouts.forEach(t => clearTimeout(t));
}
