function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    if (body.classList.contains('day')) {
        body.classList.remove('day');
        body.classList.add('night');
        themeToggle.textContent = '🌞';
    } else {
        body.classList.remove('night');
        body.classList.add('day');
        themeToggle.textContent = '🌙';
    }
}

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const navContainer = document.getElementById('nav-container');
    const menuToggle = document.getElementById('menu-toggle');
    sidebar.classList.toggle('active');
    navContainer.classList.toggle('active');
    menuToggle.checked = sidebar.classList.contains('active');
}

function toggleSupport() {
    const supportButton = document.getElementById('support-button');
    supportButton.classList.toggle('active');
}

function closeMenu() {
    const sidebar = document.getElementById('sidebar');
    const navContainer = document.getElementById('nav-container');
    const menuToggle = document.getElementById('menu-toggle');
    const supportButton = document.getElementById('support-button');
    sidebar.classList.remove('active');
    navContainer.classList.remove('active');
    supportButton.classList.remove('active');
    menuToggle.checked = false;
}

function toggleOsBox(boxId) {
    const boxes = ['android', 'iphone', 'windows'];
    boxes.forEach(id => {
        if (id !== boxId) {
            const content = document.getElementById(`${id}-content`);
            const header = document.querySelector(`#${id} .os-box-header`);
            content.classList.remove('active');
            content.style.display = 'none';
            header.classList.remove('active');
            document.getElementById(`${id}-install-options`).style.display = 'none';
            document.getElementById(`${id}-video-content`).style.display = 'none';
            document.getElementById(`${id}-slider`).style.display = 'none';
        }
    });
    const content = document.getElementById(`${boxId}-content`);
    const header = document.querySelector(`#${boxId} .os-box-header`);
    content.classList.toggle('active');
    header.classList.toggle('active');
    content.style.display = content.classList.contains('active') ? 'block' : 'none';
}

function toggleInstallOptions(boxId) {
    const options = document.getElementById(`${boxId}-install-options`);
    const video = document.getElementById(`${boxId}-video-content`);
    const slider = document.getElementById(`${boxId}-slider`);
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
    video.style.display = 'none';
    slider.style.display = 'none';
}

function toggleVideo(boxId) {
    const options = document.getElementById(`${boxId}-install-options`);
    const video = document.getElementById(`${boxId}-video-content`);
    const slider = document.getElementById(`${boxId}-slider`);
    video.style.display = video.style.display === 'block' ? 'none' : 'block';
    options.style.display = 'none';
    slider.style.display = 'none';
}

function toggleSlider(boxId) {
    const options = document.getElementById(`${boxId}-install-options`);
    const video = document.getElementById(`${boxId}-video-content`);
    const slider = document.getElementById(`${boxId}-slider`);
    slider.style.display = slider.style.display === 'block' ? 'none' : 'block';
    options.style.display = 'none';
    video.style.display = 'none';
}

let currentSlides = { android: 0, iphone: 0, windows: 0 };

function moveSlider(boxId, direction) {
    const sliderImages = document.getElementById(`${boxId}-slider-images`);
    const images = sliderImages.querySelectorAll('.slider-image');
    const counter = document.getElementById(`${boxId}-slider-counter`);
    currentSlides[boxId] = (currentSlides[boxId] + direction + images.length) % images.length;
    sliderImages.style.transform = `translateX(-${currentSlides[boxId] * 100}%)`;
    counter.textContent = `تصویر ${currentSlides[boxId] + 1}/10`;
}

document.querySelectorAll('.slider-images').forEach(slider => {
    let isDragging = false, startX, scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    slider.addEventListener('mouseup', () => {
        isDragging = false;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchend', () => {
        isDragging = false;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
});

window.addEventListener('online', () => {
    document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
    document.body.classList.add('offline');
});

document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const navContainer = document.getElementById('nav-container');
    const supportButton = document.getElementById('support-button');
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickInsideNav = navContainer.contains(event.target);
    const isClickInsideSupport = supportButton.contains(event.target);

    if (!isClickInsideSidebar && !isClickInsideNav && !isClickInsideSupport && sidebar.classList.contains('active')) {
        closeMenu();
    }
});

document.addEventListener('touchstart', function(event) {
    if (event.target.closest('.nav-container') || event.target.closest('.sidebar') || event.target.closest('.support-button') || event.target.closest('.os-box-header') || event.target.closest('.os-box-content div') || event.target.closest('.slider-button')) {
        // اجازه عملکرد به المان‌های کلیک‌شدنی
    } else {
        if (document.getElementById('sidebar').classList.contains('active')) {
            closeMenu();
        }
    }
}, { passive: true });
