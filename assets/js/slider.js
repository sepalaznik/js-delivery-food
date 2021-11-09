// add to header in index.html:
// <link rel="stylesheet" href="./assets/libs/chief-slider/chief-slider.css">
// <script defer src="./assets/libs/chief-slider/chief-slider.js"></script>

// layot must have next structure:
// <div class="slider">
//    <div class="slider__wrapper">
//        <div class="slider__items">
//            <div class="slider__item">Slide 1</div>

// in style.css needs add:
// .slider__wrapper { overflow: hidden; }

document.addEventListener('DOMContentLoaded', function () {
    const slider = new ChiefSlider('.slider', {
        loop: true,
        autoplay: true,
        interval: 4000,
        grabCursor: true,
    });
});
