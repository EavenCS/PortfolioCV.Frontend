// Skill Animation
const initSkillAnimation = () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        item.style.transition = 'all 0.3s ease';
        observer.observe(item);
    });
};

// Dynamic Date Calculations
const updateDynamicDates = () => {
    const calculateDuration = (startDate) => {
        const start = new Date(startDate);
        const now = new Date();
        const diff = now - start;
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        return `${years}y ${months}m`;
    };

    const elements = document.querySelectorAll('[data-start-date]');
    elements.forEach(el => {
        const duration = calculateDuration(el.dataset.startDate);
        el.textContent = duration;
    });
};

// Certificate Animation
const initCertificateAnimation = () => {
    const certificates = document.querySelectorAll('.certificate-item');
    
    certificates.forEach(cert => {
        cert.addEventListener('mouseenter', () => {
            cert.style.transform = 'translateY(-2px)';
            cert.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
        
        cert.addEventListener('mouseleave', () => {
            cert.style.transform = 'translateY(0)';
            cert.style.boxShadow = 'none';
        });
    });
};

// Share Functionality
const initShareFeature = () => {
    const shareButton = document.getElementById('shareButton');
    const shareModal = document.getElementById('shareModal');
    const closeModal = document.querySelector('.close-modal');
    const shareOptions = document.querySelectorAll('.share-option');

    const shareData = {
        title: 'Eaven Schmalz - Software Developer',
        text: 'Check out my portfolio!',
        url: window.location.href
    };

    const showToast = (message, duration = 2000) => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, duration);
        });
    };

    // Handle mobile share API
    if (navigator.share) {
        shareButton.addEventListener('click', async () => {
            try {
                await navigator.share(shareData);
            } catch (err) {
                showToast('Error sharing content');
            }
        });
    } else {
        // Desktop share functionality
        shareButton.addEventListener('click', () => {
            shareModal.style.display = 'flex';
        });

        closeModal.addEventListener('click', () => {
            shareModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === shareModal) {
                shareModal.style.display = 'none';
            }
        });

        shareOptions.forEach(option => {
            option.addEventListener('click', async () => {
                const platform = option.dataset.platform;

                switch (platform) {
                    case 'linkedin':
                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`);
                        break;
                    case 'twitter':
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`);
                        break;
                    case 'email':
                        window.location.href = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(`${shareData.text}\n\n${shareData.url}`)}`;
                        break;
                    case 'copy':
                        try {
                            await navigator.clipboard.writeText(shareData.url);
                            showToast('Link copied to clipboard!');
                        } catch (err) {
                            showToast('Failed to copy link');
                        }
                        break;
                }

                shareModal.style.display = 'none';
            });
        });
    }
};

// Smooth Scroll
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Volunteer Description Hover
const initVolunteerHover = () => {
    const volunteerItems = document.querySelectorAll('.volunteer-item');
    
    volunteerItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-2px)';
            item.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.backgroundColor = 'transparent';
        });
    });
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initSkillAnimation();
    updateDynamicDates();
    initCertificateAnimation();
    initShareFeature();
    initSmoothScroll();
    initVolunteerHover();
    
    // Update dates periodically
    setInterval(updateDynamicDates, 1000 * 60 * 60); // Update every hour
});

// Handle visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        updateDynamicDates();
    }
});

async function updateVisitCount() {
    try {
        const response = await fetch('https://api.countapi.xyz/hit/eavencs.github.io/visits');
        const data = await response.json();
        document.getElementById('visit-count').textContent = data.value;
    } catch (error) {
        console.error('Error updating visit count:', error);
    }
}

document.addEventListener('DOMContentLoaded', updateVisitCount);