// Load shared header
async function loadHeader() {
    try {
        const response = await fetch('header.html');
        const headerHtml = await response.text();
        
        // Insert header at the beginning of the body
        document.body.insertAdjacentHTML('afterbegin', headerHtml);
        
        // Initialize lucide icons for the header
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Initialize mobile menu functionality
        initializeMobileMenu();
        
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            });
        });
    }
}

// Load header when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
} 