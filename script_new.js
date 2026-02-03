/*
PORTFOLIO PERSONNEL - JAVASCRIPT
Fonctionnalités de base pour démontrer les compétences
*/

document.addEventListener('DOMContentLoaded', function() {
    initMotivationButtons();
    initContactForm();
    initSectionIndicator();
});

/* Indicateur de section active */
function initSectionIndicator() {
    const indicatorLine = document.getElementById('indicator-line');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    function updateIndicator(sectionId) {
        const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) {
            const linkRect = activeLink.getBoundingClientRect();
            const headerRect = document.querySelector('.header').getBoundingClientRect();
            indicatorLine.style.left = (linkRect.left - headerRect.left) + 'px';
            indicatorLine.style.width = linkRect.width + 'px';
        }
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const sectionId = this.getAttribute('href').substring(1);
            updateIndicator(sectionId);
        });
    });
    
    window.addEventListener('scroll', function() {
        let currentSection = 'accueil';
        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 150) {
                currentSection = section.id;
            }
        });
        updateIndicator(currentSection);
    });
    
    updateIndicator('accueil');
}

/* Boutons de motivation */
function initMotivationButtons() {
    const messages = [
        "💪 Vous êtes capable de tout! La persévérance est la clé du succès!",
        "🚀 Visez les étoiles! Votre potentiel n'a pas de limites!",
        "✨ Vous êtes unique et spécial! Croyez en vous!",
        "🎯 Chaque jour est une nouvelle chance. Vous pouvez le faire!"
    ];
    
    const motivationButtons = document.querySelectorAll('.motivation-btn');
    const responseZone = document.querySelector('.motivation-response');
    
    motivationButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const message = messages[index % messages.length];
            responseZone.textContent = message;
            responseZone.style.display = 'flex';
            
            setTimeout(() => {
                responseZone.style.display = 'none';
            }, 5000);
        });
    });
}

/* Validation formulaire de contact */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    const messageZone = document.querySelector('.form-message');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation simple
        if (!name || !email || !message) {
            showMessage(messageZone, false, '❌ Veuillez remplir tous les champs');
            return;
        }
        
        // Validation email simple
        if (!email.includes('@')) {
            showMessage(messageZone, false, '❌ Email invalide');
            return;
        }
        
        // Succès
        showMessage(messageZone, true, '✅ Message envoyé avec succès!');
        form.reset();
        
        setTimeout(() => {
            messageZone.style.display = 'none';
        }, 3000);
    });
}

function showMessage(zone, isSuccess, text) {
    zone.textContent = text;
    zone.className = 'form-message ' + (isSuccess ? 'success' : 'error');
    zone.style.display = 'flex';
}
