/* =====================================================
   PORTFOLIO PERSONNEL - INTERACTIVITÉ JAVASCRIPT
   ===================================================== */

// Initialiser EmailJS
emailjs.init('VOTRE_PUBLIC_KEY_ICI'); // À remplacer par votre clé publique EmailJS

document.addEventListener('DOMContentLoaded', function() {
    initMotivationButtons();
    initContactForm();
    initScrollAnimations();
    console.log('✅ Portfolio chargé avec succès !');
});

/* ===== GESTION DES BOUTONS DE MOTIVATION ===== */
function initMotivationButtons() {
    const buttons = document.querySelectorAll('.motivation-btn');
    const responseDiv = document.querySelector('.motivation-response');

    const messages = {
        'Curiosité': '🧠 La curiosité m\'anime chaque jour. J\'aime explorer de nouvelles technologies et approfondir mes connaissances en développement web. Chaque problème est une opportunité d\'apprendre !',
        'Défi': '🎯 Les défis me motivent à me dépasser. Transformer une idée en réalité, résoudre des problèmes complexes, et créer des solutions innovantes m\'enthousiasme profondément.',
        'Communauté': '👥 Je crois au pouvoir de la collaboration. Partager mes connaissances, aider d\'autres développeurs et faire partie d\'une communauté créative est inspirant pour moi.',
        'Excellence': '🏆 Je vise toujours l\'excellence. Que ce soit dans le code que j\'écris ou dans les projets que je réalise, je m\'efforce de maintenir des standards élevés et de créer de la qualité.'
    };

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const buttonText = this.textContent.trim();
            let messageKey = '';
            
            if (buttonText.includes('Curiosité')) messageKey = 'Curiosité';
            else if (buttonText.includes('Défi')) messageKey = 'Défi';
            else if (buttonText.includes('Communauté')) messageKey = 'Communauté';
            else if (buttonText.includes('Excellence')) messageKey = 'Excellence';
            
            const message = messages[messageKey] || 'Message non trouvé.';
            
            responseDiv.classList.remove('active');
            setTimeout(() => {
                responseDiv.textContent = message;
                responseDiv.classList.add('active');
            }, 100);
        });
    });
}

/* ===== GESTION DU FORMULAIRE DE CONTACT ===== */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    const messageDiv = document.querySelector('.form-message');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showMessage('⚠️ Veuillez remplir tous les champs.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showMessage('⚠️ Veuillez entrer une adresse email valide.', 'error');
                return;
            }

            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.disabled = true;
            button.textContent = '⏳ Envoi en cours...';

            // Envoyer l'email via EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'yeolevi18@gmail.com'
            };

            emailjs.send('VOTRE_SERVICE_ID', 'VOTRE_TEMPLATE_ID', templateParams)
                .then(response => {
                    showMessage('✅ Merci ' + name + ' ! Votre message a été envoyé avec succès. Je vous recontacterai bientôt.', 'success');
                    form.reset();
                    button.disabled = false;
                    button.textContent = originalText;
                })
                .catch(error => {
                    console.error('Erreur lors de l\'envoi:', error);
                    showMessage('❌ Erreur lors de l\'envoi. Veuillez réessayer plus tard.', 'error');
                    button.disabled = false;
                    button.textContent = originalText;
                });
        });
    }

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = 'form-message ' + type;
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'form-message';
            messageDiv.style.display = 'none';
        }, 5000);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

/* ===== ANIMATIONS AU SCROLL ===== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.interest-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    document.querySelectorAll('.passion-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

/* ===== INFORMATIONS PORTFOLIO ===== */
console.log('========= PORTFOLIO CHARGÉ =========');
console.log('Nom: YEO LEVI ELIEL.S');
console.log('Poste: Développeur Web Junior');
console.log('Technologies: HTML5, CSS3, JavaScript');
console.log('Passions: Développement Web, Entrepreneuriat, Gaming, Musique Gospel');
console.log('=====================================');

/* ===== ANIMATION DES CARTES D'INTÉRÊT AU SURVOL ===== */
document.querySelectorAll('.interest-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.05)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

document.querySelectorAll('.passion-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.05)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
