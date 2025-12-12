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
    
    // Tekst-në-të-folur - FIXI KRYESOR
    const textToSpeechToggle = document.getElementById('textToSpeechToggle');
    const speakBtn = document.getElementById('speakBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const demoText = document.getElementById('demoText');
    const voiceSpeed = document.getElementById('voiceSpeed');
    const speedValue = document.getElementById('speedValue');
    
    let speech = null;
    // Ndrysho: Aktivo tekst-në-të-folur si parazgjedhje
    let isTextToSpeechEnabled = true;
    
    // Funksioni për përditësimin e butonit të tekst-në-të-folur
    function updateTextToSpeechButton() {
        if (isTextToSpeechEnabled) {
            textToSpeechToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            textToSpeechToggle.setAttribute('aria-label', 'Çaktivizo tekst-në-të-folur');
            speakBtn.disabled = false;
            pauseBtn.disabled = false;
            stopBtn.disabled = false;
        } else {
            textToSpeechToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            textToSpeechToggle.setAttribute('aria-label', 'Aktivizo tekst-në-të-folur');
            speakBtn.disabled = true;
            pauseBtn.disabled = true;
            stopBtn.disabled = true;
        }
    }
    
    // Përditëso butonin në fillim
    updateTextToSpeechButton();
    
    // Ndez/Fik tekst-në-të-folur
    textToSpeechToggle.addEventListener('click', function() {
        isTextToSpeechEnabled = !isTextToSpeechEnabled;
        
        if (isTextToSpeechEnabled) {
            announceToScreenReader('Teksti në të folur është aktivizuar');
        } else {
            announceToScreenReader('Teksti në të folur është çaktivizuar');
            if (speech) {
                speechSynthesis.cancel();
            }
        }
        
        updateTextToSpeechButton();
    });
    
    // Shfaq vlerën e shpejtësisë
    voiceSpeed.addEventListener('input', function() {
        speedValue.textContent = this.value;
    });
    
    // Dëgjo tekstin - FIXI KRYESOR
    speakBtn.addEventListener('click', function() {
        console.log("Butoni 'Dëgjo tekstin' u klikua");
        console.log("isTextToSpeechEnabled:", isTextToSpeechEnabled);
        
        if (!isTextToSpeechEnabled) {
            alert('Ju lutemi aktivizoni tekst-në-të-folur së pari!');
            return;
        }
        
        if ('speechSynthesis' in window) {
            console.log("SpeechSynthesis API mbështetet");
            
            // Anulo çdo lexim të mëparshëm
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            }
            
            // Krijo objektin e të folurit
            speech = new SpeechSynthesisUtterance(demoText.textContent);
            speech.lang = 'sq-AL';
            speech.rate = parseFloat(voiceSpeed.value);
            speech.pitch = 1;
            speech.volume = 1;
            
            // Shto event listener për ndjekjen e leximit
            speech.onstart = function() {
                console.log("Leximi i tekstit filloi");
            };
            
            speech.onend = function() {
                console.log('Leximi i tekstit përfundoi');
            };
            
            speech.onerror = function(event) {
                console.error('Gabim gjatë leximit të tekstit:', event.error);
                alert('Ndodhi një gabim gjatë leximit të tekstit. Ju lutemi provoni përsëri ose kontrolloni nëse shfletuesi juaj mbështet këtë veçori.');
            };
            
            // Lexo tekstin
            speechSynthesis.speak(speech);
            console.log("U thirr speechSynthesis.speak()");
            
        } else {
            console.error("SpeechSynthesis API nuk mbështetet");
            alert('Shfletuesi juaj nuk e mbështet tekstin në të folur. Ju lutemi përdorni një shfletues tjetër si Chrome, Edge ose Safari.');
        }
    });
    
    // Pauzo leximin
    pauseBtn.addEventListener('click', function() {
        if (speechSynthesis.speaking && !speechSynthesis.paused) {
            speechSynthesis.pause();
            console.log("Leximi u pauzua");
        }
    });
    
    // Ndalo leximin
    stopBtn.addEventListener('click', function() {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
            console.log("Leximi u ndal");
        }
    });
    
    // Demonstruesi i kontrastit
    const toggleContrastDemo = document.getElementById('toggleContrastDemo');
    const contrastDemo = document.querySelector('.contrast-demo');
    
    if (toggleContrastDemo && contrastDemo) {
        toggleContrastDemo.addEventListener('click', function() {
            contrastDemo.classList.toggle('demo-high-contrast');
            
            if (contrastDemo.classList.contains('demo-high-contrast')) {
                this.innerHTML = '<i class="fas fa-adjust"></i> Kthehu në pamjen normale';
            } else {
                this.innerHTML = '<i class="fas fa-adjust"></i> Ndërro në kontrast të lartë';
            }
        });
    }
    
    // Menyja hamburger për ekran të vegjël
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                hamburgerMenu.innerHTML = '<i class="fas fa-times"></i>';
                hamburgerMenu.setAttribute('aria-label', 'Mbyll menynë');
            } else {
                hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>';
                hamburgerMenu.setAttribute('aria-label', 'Shfaq menynë');
            }
        });
    }
    
    // Modalet për hyrje dhe regjistrim
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const closeRegisterModal = document.getElementById('closeRegisterModal');
    const goToRegister = document.getElementById('goToRegister');
    
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.add('active');
            if (navMenu) navMenu.classList.remove('active');
            if (hamburgerMenu) hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>';
        });
    }
    
    if (registerBtn && registerModal) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.classList.add('active');
            if (navMenu) navMenu.classList.remove('active');
            if (hamburgerMenu) hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>';
        });
    }
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (loginModal) loginModal.classList.remove('active');
            if (registerModal) registerModal.classList.remove('active');
        });
    });
    
    if (closeRegisterModal && registerModal) {
        closeRegisterModal.addEventListener('click', function() {
            registerModal.classList.remove('active');
        });
    }
    
    if (goToRegister && loginModal && registerModal) {
        goToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.remove('active');
            registerModal.classList.add('active');
        });
    }
    
    // Mbyll modalet kur klikohet jashtë
    window.addEventListener('click', function(e) {
        if (loginModal && e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        
        if (registerModal && e.target === registerModal) {
            registerModal.classList.remove('active');
        }
    });
});