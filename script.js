const hero = document.querySelector('.hero');
const herotitle = hero.querySelectorAll('.hero_title > .ofh > .h1');

const settings = {
    isEnabled: false,
    count: 1,
    time: 50,
};

const images = [
    './img-1.jpg',
    './img-2.jpg',
    './img-3.jpg',
    './img-4.jpg',
    './img-5.jpg',
    './img-6.jpg',
    './img-7.jpg',
    './img-8.jpg',
    './img-9.jpg',
    './img-10.jpg',
];

const inithero = () => {
    gsap.set(herotitle, { x: '-101%' });
    showhero();
};

const showhero = () => {
    gsap.to(herotitle, {
        duration: 1.75,
        x: 0,
        ease: 'expo.inOut',
        stagger: 0.025,
    });
};

const preloadImages = () => {
    for (let i = 0; i < images.length; i++) {
        let link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = images[i];
        document.head.appendChild(link);
    }
};

const calcIndex = (length) => {
    settings.count++;

    if (settings.count == length) settings.count = 0;

    return settings.count;
};

const animateImages = (event) => {
    const image = document.createElement('img'); // Corrected
    const imagesize = 50;

    const countindex = calcIndex(images.length);
    image.classList.add('hero_media');
    image.setAttribute('src', images[countindex]);

    image.style.width = `${imagesize}rem`;
    image.style.height = `${imagesize}rem`;
    image.style.top = event.pageY - (imagesize * 10) / 2 + 'px';
    image.style.left = event.pageX - (imagesize * 10) / 2 + 'px';

    hero.appendChild(image);

    const randomdeg = Math.floor(Math.random() * 15);

    window.setTimeout(() => {
        image.style.transform = `scale(1)`; // Corrected
        image.style.transform = `rotate(${randomdeg}deg)`; // Corrected
    }, 50);

    window.setTimeout(() => {
        image.style.opacity = 0;
        image.style.filter = 'blur(10px)';
        image.style.transform = 'scale(0.25)';
    }, 1500);

    window.setTimeout(() => {
        hero.removeChild(image);
    }, 2500);
};

window.addEventListener('mousemove', (event) => {
    if (!settings.isEnabled) {
        settings.isEnabled = true;

        setTimeout(() => {
            settings.isEnabled = false;
        }, settings.time);

        animateImages(event);
    }
});

window.onload = () => {
    preloadImages();
    inithero();
};
