const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const images = document.querySelectorAll(".image");
let random = gsap.utils.random(0.2, 75, 2, true);
let randomImageSize = gsap.utils.random(200, 500, true);

function setImages() {
  images.forEach((image) => {
    let randomY = Math.round((random() * screenHeight) / 200);
    let randomW = Math.round(random() * screenWidth) / 100;

    //image.style.top = Math.round(screenHeight + randomY) + "px";
    image.style.top = Math.round(screenHeight) + "px";

    image.style.left = randomW + "px";

    if (screenWidth < 800) {
      image.style.width = Math.round(randomImageSize() / 3) + "px";
      console.log(
        (image.style.width = Math.round(randomImageSize() / 3) + "px")
      );
    } else {
      image.style.width = Math.round(randomImageSize()) + "px";
    }

    // Make larger images appear closer
    image.style.zIndex = Math.round(image.style.width.replace("px", "") / 40);
  });
}

setImages();

gsap
  .to(".image", {
    y: function (index, target) {
      return -Math.round(target.offsetHeight + screenHeight) + "px";
    },
    ease: "none",
    duration: function (index, target) {
      return 10000 / target.style.width.replace("px", "");
    },
    stagger: {
      amount: 3,
      repeat: -1,
      delay: function (index, target) {
        return -10000 / target.style.width.replace("px", "");
      }
    }
  })
  .progress(0.5);
