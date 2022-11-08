const cursor = document.querySelector(".cursor");
const outercursor = document.querySelector(".outer-cursor");

// follow
document.addEventListener("mousemove", (e) => {
  let x = e.pageX;
  let y = e.pageY;

  cursor.style.top = y + "px";
  cursor.style.left = x + "px";
  outercursor.style.top = y + "px";
  outercursor.style.left = x + "px";
  cursor.style.display = "block";
  outercursor.style.opacity = "1";
});

//  cursor effect on mouseout
document.addEventListener("mouseout", () => {
  cursor.style.display = "none";
});

//  click mouse
document.addEventListener("click", (e) => {
  const curs = createCursor(e.pageX, e.pageY);
  document.body.append(curs);
});

//  cursor effect on mouseclick
const createCursor = (x, y) => {
  const curs = document.createElement("div");
  curs.className = "click";
  curs.style.top = y + "px";
  curs.style.left = x + "px";
  return curs;
};
// links mosue effect
const links = document.querySelectorAll("li");

links.forEach((link) => {
  link.addEventListener("mouseover", () => {
    cursor.classList.add("grow");
  });
  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("grow");
  });
});

// loader
const loader = document.querySelector(".loader");
const scroll = document.querySelector(".scroll");
const body = document.querySelector(".body");
body.classList.add("fondu-out");
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("fondu-out");
    body.style.display = "contents";
    scroll.style.opacity = 1;
  }, 50);
});

// h1 josia
const h1 = document.querySelector("h1");
document.addEventListener("mouseenter", () => {});

// animation anime js
anime({
  targets: "#nom ",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 1500,
  delay: function (el, i) {
    return i * 250;
  },
  direction: "alternate",
  loop: true,
});

//
let path = anime.path("#svg path");

anime({
  targets: "#demo-svg path",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutQuad",
  duration: 8000,
  loop: true,
});
// rellax
const rellax = new Rellax(".rellax");
// navbar
