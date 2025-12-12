// Funksionet bazë për aksesueshmëri dhe funksionalitetin e aplikacionit

document.addEventListener('DOMContentLoaded', function() {
    console.log("Aplikacioni është ngarkuar!");
    
    // Kontrolli i transparencës
    const transparencyNotice = document.getElementById('transparencyNotice');
    
    // Ruaj preferencën për njoftimin e transparencës
    if (localStorage.getItem('transparencyNoticeClosed') === 'true') {
        transparencyNotice.style.display = 'none';
    }
    
    // Funksioni për mbylljen e njoftimit të transparencës
    window.closeTransparencyNotice = function() {
        transparencyNotice.style.display = 'none';
        localStorage.setItem('transparencyNoticeClosed', 'true');
    };
    
    // Kontrolli i madhësisë së fontit
    const increaseFontBtn = document.getElementById('increaseFont');
    const decreaseFontBtn = document.getElementById('decreaseFont');
    const htmlElement = document.documentElement;
    
    // Nisja e madhësisë së fontit
    let currentFontSize = parseFloat(getComputedStyle(htmlElement).fontSize);
    
    increaseFontBtn.addEventListener('click', function() {
        currentFontSize += 1;
        htmlElement.style.fontSize = currentFontSize + 'px';
        localStorage.setItem('fontSize', currentFontSize);
    });
    
    decreaseFontBtn.addEventListener('click', function() {
        if (currentFontSize > 12) {
            currentFontSize -= 1;
            htmlElement.style.fontSize = currentFontSize + 'px';
            localStorage.setItem('fontSize', currentFontSize);
        }
    });
    
    // Restaurimi i madhësisë së fontit të ruajtur
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        currentFontSize = parseFloat(savedFontSize);
        htmlElement.style.fontSize = currentFontSize + 'px';
    }
});