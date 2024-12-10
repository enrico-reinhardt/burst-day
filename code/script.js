//AUTO SCROLL
// function pageScroll() {
//   window.scrollBy(0,1);
//   scrolldelay = setTimeout(pageScroll,10);
// }
// window.setTimeout(()=>pageScroll(),5000)

const slides = document.querySelectorAll(".slide");
const container = document.querySelector(".slides");
let offset = 5;
const zoomFactor = 50;

slides.forEach((slide, index) => {
  const zTranslation = index * zoomFactor;
  slide.style.transform = `translateZ(-${zTranslation}px)`;
});

function updateSlides() {
  const scrollY = window.scrollY;
  console.log(scrollY);
  container.style.transform = `translateZ(${scrollY}px)`;
}

window.addEventListener("scroll", updateSlides);
// Initialize slide positions
updateSlides();

const extruded = document.querySelectorAll(".extrude");
extruded.forEach((extrude, index) => {
  extrudeWords(extrude);
});

function extrudeWords(paragraph) {
  // setInterval(() => {
  const words = paragraph.innerText.split("");

  paragraph.innerHTML = "";
  words.forEach((word) => {
    const span = document.createElement("span");
    span.innerText = word + " ";
    span.className = "extruded-word";
    const translateX = Math.random() * 5 + 10;
    const translateY = Math.random() * 5 + 10;
    const translateZ = Math.random() * 50 + 10;
    const scale = 0.5 + Math.random() * 0.8;
    span.style.transform = `translate(${translateX}px, 0, ${translateZ}px) scale(${scale})`;
    paragraph.appendChild(span);
  });
  // }, 400);
}

const layered = document.querySelectorAll(".layers");
layered.forEach((layer, index) => {
  extrudeLayers(layer);
});

function extrudeLayers(layer) {
  // setInterval(() => {
  const paragraph = layer;
  const words = paragraph.textContent.split(" ");
  paragraph.innerHTML = ""; // Clear the paragraph's content
  words.forEach((word) => {
    const span = document.createElement("span");
    span.className = "word-span";
    span.textContent = word + " "; // Add a space after each word
    span.style.transform = `translateZ(${Math.random * 100 + 100}px)`;
    paragraph.appendChild(span);
  });
  // }, 400);
}

const textBlocks = document.querySelectorAll(".indents");
textBlocks.forEach((textBlock) => {
  const lines = textBlock.innerHTML.split("<br>");
  let indentedText = lines
    .map((line) => {
      const randomIndent = Math.floor(Math.random() * 200);
      return `<span style="transform:translateX(-${randomIndent}px)">${line}</span>`;
    })
    .join("<br>");
  textBlock.innerHTML = indentedText;
});
