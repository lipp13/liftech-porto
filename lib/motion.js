import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

export function registerGSAP() {
  if (typeof window !== "undefined" && !isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }
  return { gsap, ScrollTrigger };
}

export const EASE = {
  smooth: "power3.out",
  cinematic: "power4.out",
  expo: "expo.out",
  gentle: "sine.inOut",
};

export { gsap, ScrollTrigger };
