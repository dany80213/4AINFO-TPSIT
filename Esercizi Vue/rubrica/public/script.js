// Element References
const contactsGrid = document.getElementById('contactsGrid');
const emptyState = document.getElementById('emptyState');
const loadingState = document.getElementById('loadingState');
const searchInput = document.getElementById('searchInput');

// Form Elements
const formTitle = document.getElementById('formTitle');
const contactForm = document.getElementById('contactForm');
const contactIdInput = document.getElementById('contactId');
const nomeInput = document.getElementById('nome');
const cognomeInput = document.getElementById('cognome');
const telefonoInput = document.getElementById('telefono');
const emailInput = document.getElementById('email');
const resetFormBtn = document.getElementById('resetFormBtn');

// Toast
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// State
let contacts = [];
const API_URL = '/api/contacts';

// Initialize
document.addEventListener('DOMContentLoaded', fetchContacts);

// Fetch contacts from server
async function fetchContacts() {
    showLoading(true);
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        contacts = await response.json();
        renderContacts(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        showToast('Errore nel caricamento dei contatti', 'error');
    } finally {
        showLoading(false);
    }
}

// Render contacts list
function renderContacts(contactsToRender) {
    contactsGrid.innerHTML = '';
    
    if (contactsToRender.length === 0) {
        contactsGrid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    contactsGrid.classList.remove('hidden');
    
    contactsToRender.forEach(contact => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">${contact.nome} ${contact.cognome}</div>
            <div class="card-details">
                <div><i class="fa-solid fa-phone"></i> ${contact.telefono}</div>
                ${contact.email ? `<div><i class="fa-solid fa-envelope"></i> ${contact.email}</div>` : ''}
            </div>
            <div class="card-actions">
                <button class="btn btn-edit-ghost" onclick="editContact('${contact.id}')">Modifica</button>
                <button class="btn btn-danger-ghost" onclick="deleteContact('${contact.id}')">Elimina</button>
            </div>
        `;
        contactsGrid.appendChild(card);
    });
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = contacts.filter(c => 
        c.nome.toLowerCase().includes(searchTerm) || 
        c.cognome.toLowerCase().includes(searchTerm) ||
        c.telefono.includes(searchTerm) ||
        (c.email && c.email.toLowerCase().includes(searchTerm))
    );
    renderContacts(filtered);
});

// Form Submit Handler (Add or Update)
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const contactData = {
        nome: nomeInput.value.trim(),
        cognome: cognomeInput.value.trim(),
        telefono: telefonoInput.value.trim(),
        email: emailInput.value.trim()
    };
    
    const id = contactIdInput.value;
    const isEditing = !!id;
    
    try {
        const url = isEditing ? `${API_URL}/${id}` : API_URL;
        const method = isEditing ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });
        
        if (!response.ok) throw new Error('Server error');
        
        await fetchContacts(); // Refresh list
        resetForm();
        showToast(isEditing ? 'Contatto aggiornato!' : 'Contatto aggiunto!');
        
    } catch (error) {
        console.error('Error saving contact:', error);
        showToast('Errore nel salvataggio del contatto', 'error');
    }
});

// Reset Form
resetFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetForm();
});

function resetForm() {
    contactForm.reset();
    contactIdInput.value = '';
    formTitle.textContent = 'Nuovo Contatto';
    resetFormBtn.classList.add('hidden');
}

// Global functions for inline Event Listeners
window.editContact = function(id) {
    const contact = contacts.find(c => c.id === id);
    if (contact) {
        contactIdInput.value = contact.id;
        nomeInput.value = contact.nome;
        cognomeInput.value = contact.cognome;
        telefonoInput.value = contact.telefono;
        emailInput.value = contact.email || '';
        
        formTitle.textContent = 'Modifica Contatto';
        resetFormBtn.classList.remove('hidden');
        
        // Scroll to form on mobile
        if (window.innerWidth <= 768) {
            document.querySelector('.sidebar').scrollIntoView({ behavior: 'smooth' });
        }
    }
}

window.deleteContact = async function(id) {
    if (confirm('Sei sicuro di voler eliminare questo contatto?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Server error');
            
            await fetchContacts(); // Refresh list
            
            // If deleting the contact currently being edited, reset form
            if (contactIdInput.value === id) {
                resetForm();
            }
            
            showToast('Contatto eliminato!');
            
        } catch (error) {
            console.error('Error deleting contact:', error);
            showToast('Errore nell\'eliminazione', 'error');
        }
    }
}

// UI Helpers
function showLoading(show) {
    if (show) {
        loadingState.classList.remove('hidden');
        contactsGrid.classList.add('hidden');
        emptyState.classList.add('hidden');
    } else {
        loadingState.classList.add('hidden');
    }
}

function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    
    const icon = toast.querySelector('i');
    if (type === 'error') {
        toast.style.backgroundColor = '#ef4444'; // Red
        icon.className = 'fa-solid fa-circle-exclamation toast-icon';
    } else {
        toast.style.backgroundColor = '#10b981'; // Green
        icon.className = 'fa-solid fa-check-circle toast-icon';
    }
    
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}
