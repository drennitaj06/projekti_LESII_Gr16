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
    
    // Kontrolli i kontrastit të lartë
    const highContrastBtn = document.getElementById('highContrast');
    const body = document.body;
    
    highContrastBtn.addEventListener('click', function() {
        body.classList.toggle('high-contrast');
        
        if (body.classList.contains('high-contrast')) {
            localStorage.setItem('highContrast', 'enabled');
            highContrastBtn.innerHTML = '<i class="fas fa-adjust"></i>';
            highContrastBtn.setAttribute('aria-label', 'Kthehu në modalitetin normal');
        } else {
            localStorage.setItem('highContrast', 'disabled');
            highContrastBtn.innerHTML = '<i class="fas fa-adjust"></i>';
            highContrastBtn.setAttribute('aria-label', 'Ndrysho në kontrast të lartë');
        }
    });
    
    // Restaurimi i modalitetit të kontrastit
    if (localStorage.getItem('highContrast') === 'enabled') {
        body.classList.add('high-contrast');
        highContrastBtn.innerHTML = '<i class="fas fa-adjust"></i>';
        highContrastBtn.setAttribute('aria-label', 'Kthehu në modalitetin normal');
    }

});