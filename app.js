// FNE CashFlow - Logique principale de l'application
// Gestion de l'authentification et fonctionnalités globales

document.addEventListener('DOMContentLoaded', function() {
  // Éléments du DOM
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const showRegisterBtn = document.getElementById('showRegisterBtn');
  const closeRegisterBtn = document.getElementById('closeRegisterBtn');
  const registerModal = document.getElementById('registerModal');
  const loginError = document.getElementById('loginError');
  const registerError = document.getElementById('registerError');

  // Nouveaux éléments pour les modals d'info
  const showPresentationBtn = document.getElementById('showPresentationBtn');
  const showCguBtn = document.getElementById('showCguBtn');
  const showPrivacyBtn = document.getElementById('showPrivacyBtn');
  const closePresentationBtn = document.getElementById('closePresentationBtn');
  const closeCguBtn = document.getElementById('closeCguBtn');
  const closePrivacyBtn = document.getElementById('closePrivacyBtn');
  const presentationModal = document.getElementById('presentationModal');
  const cguModal = document.getElementById('cguModal');
  const privacyModal = document.getElementById('privacyModal');

  // Modal Présentation
  if (showPresentationBtn) {
    showPresentationBtn.addEventListener('click', () => {
      presentationModal.classList.add('show');
    });
  }

  if (closePresentationBtn) {
    closePresentationBtn.addEventListener('click', () => {
      presentationModal.classList.remove('show');
    });
  }

  // Modal CGU
  if (showCguBtn) {
    showCguBtn.addEventListener('click', () => {
      cguModal.classList.add('show');
    });
  }

  if (closeCguBtn) {
    closeCguBtn.addEventListener('click', () => {
      cguModal.classList.remove('show');
    });
  }

  // Modal Confidentialité
  if (showPrivacyBtn) {
    showPrivacyBtn.addEventListener('click', () => {
      privacyModal.classList.add('show');
    });
  }

  if (closePrivacyBtn) {
    closePrivacyBtn.addEventListener('click', () => {
      privacyModal.classList.remove('show');
    });
  }

  // Fermer les modals en cliquant à l'extérieur
  [presentationModal, cguModal, privacyModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('show');
        }
      });
    }
  });

  // Afficher/masquer la modal d'inscription
  if (showRegisterBtn) {
    showRegisterBtn.addEventListener('click', () => {
      registerModal.classList.add('show');
    });
  }

  if (closeRegisterBtn) {
    closeRegisterBtn.addEventListener('click', () => {
      registerModal.classList.remove('show');
      clearForm(registerForm);
      registerError.textContent = '';
    });
  }

  // Fermer la modal en cliquant à l'extérieur
  if (registerModal) {
    registerModal.addEventListener('click', (e) => {
      if (e.target === registerModal) {
        registerModal.classList.remove('show');
        clearForm(registerForm);
        registerError.textContent = '';
      }
    });
  }

  // Connexion
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginBtn = document.getElementById('loginBtn');
    const loginError = document.getElementById('loginError');
    
    loginBtn.textContent = 'Connexion...';
    loginBtn.disabled = true;
    loginError.textContent = '';
    
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        // Redirection automatique — pas besoin de bouton manuel
        window.location.href = 'dashboard.html';
    } catch (error) {
        loginError.textContent = 'Email ou mot de passe incorrect';
        loginBtn.textContent = 'Se connecter';
        loginBtn.disabled = false;
      }
    });
  }

  // Gestion de l'inscription
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      
      // Validation des mots de passe
      if (password.length < 6) {
        registerError.textContent = 'Le mot de passe doit contenir au moins 6 caractères';
        return;
      }
      
      if (password !== confirmPassword) {
        registerError.textContent = 'Les mots de passe ne correspondent pas';
        return;
      }
      
      // Afficher l'état de chargement
      const registerBtn = document.getElementById('registerBtn');
      const originalText = registerBtn.textContent;
      registerBtn.textContent = 'Inscription...';
      registerBtn.disabled = true;
      
      try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        console.log('Inscription réussie:', result.user.email);
        // Forcer la redirection avec plusieurs méthodes
        setTimeout(() => {
          window.location.href = 'dashboard.html';
          window.location.assign('dashboard.html');
        }, 100);
      } catch (error) {
        handleAuthError(error, registerError);
      } finally {
        registerBtn.textContent = originalText;
        registerBtn.disabled = false;
      }
    });
  }
});

// Gestion des erreurs d'authentification
function handleAuthError(error, errorElement) {
  let message = '';
  
  switch (error.code) {
    case 'auth/user-not-found':
      message = 'Aucun compte trouvé avec cet email';
      break;
    case 'auth/wrong-password':
      message = 'Mot de passe incorrect';
      break;
    case 'auth/email-already-in-use':
      message = 'Un compte existe déjà avec cet email';
      break;
    case 'auth/weak-password':
      message = 'Le mot de passe doit contenir au moins 6 caractères';
      break;
    case 'auth/invalid-email':
      message = 'Format d\'email invalide';
      break;
    case 'auth/too-many-requests':
      message = 'Trop de tentatives. Veuillez réessayer plus tard';
      break;
    default:
      message = 'Une erreur est survenue. Veuillez réessayer';
  }
  
  errorElement.textContent = message;
}

// Vider un formulaire
function clearForm(form) {
  form.reset();
}

// Fonction de déconnexion (utilisée dans les autres pages)
async function logout() {
  try {
    await auth.signOut();
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Erreur de déconnexion:', error);
  }
}

// Vérifier si l'utilisateur est connecté (pour les pages protégées)
function checkAuth() {
  if (!auth.currentUser) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

// Formater la date en français
function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// Formater les montants en FCFA
function formatAmount(amount) {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}
