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

export const EASING = {
  smooth: "power3.out",
  editorial: "power4.out",
  cinematic: "expo.out",
  gentle: "sine.inOut",
};

export { gsap, ScrollTrigger };
