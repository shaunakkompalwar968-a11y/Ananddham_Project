document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }

  // 2. Dynamic Price & Group Discount Calculation
  const packageSelect = document.getElementById('packageSelect');
  const guestCountInput = document.getElementById('guestCount');
  const grandTotalElem = document.getElementById('grandTotal');

  function calculateBill() {
    if (!packageSelect || !guestCountInput || !grandTotalElem) return;
    
    const rate = parseFloat(packageSelect.value) || 450;
    const guests = parseInt(guestCountInput.value) || 1;
    let total = rate * guests;

    // Apply 10% discount for 10 or more guests
    if (guests >= 10) {
      total = total * 0.9;
    }

    grandTotalElem.textContent = `₹${total.toLocaleString('en-IN')}`;
  }

  if (packageSelect && guestCountInput) {
    packageSelect.addEventListener('change', calculateBill);
    guestCountInput.addEventListener('input', calculateBill);
  }

  window.selectPackage = function(price) {
    if (packageSelect) {
      packageSelect.value = price;
      calculateBill();
    }
  };

  // 3. Booking Request Handler via WhatsApp
  const form = document.getElementById('agriBookingForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('guestName').value;
      const phone = document.getElementById('contactNumber').value;
      const date = document.getElementById('visitDate').value;
      const pkg = packageSelect.options[packageSelect.selectedIndex].text;
      const guests = guestCountInput.value;
      const total = grandTotalElem.textContent;

      const message = `Hello Anand dham,%0A%0A*New Booking Enquiry*%0A- Name: ${encodeURIComponent(name)}%0A- Phone: ${encodeURIComponent(phone)}%0A- Package: ${encodeURIComponent(pkg)}%0A- Guests: ${guests}%0A- Date: ${date}%0A- Total Estimate: ${total}`;

      window.open(`https://wa.me/918208219849?text=${message}`, '_blank');
    });
  }

  // 4. Floating Contact Widget Toggle
  const fabToggle = document.getElementById('fabToggle');
  const contactButtons = document.getElementById('contactButtons');

  if (fabToggle && contactButtons) {
    fabToggle.addEventListener('click', () => {
      contactButtons.classList.toggle('hidden');
    });
  }

  // 5. Gallery Filter & Lightbox
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentImgIndex = 0;
  let activeItems = [...galleryItems];

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      activeItems = [];

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hide');
          activeItems.push(item);
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  function openLightbox(index) {
    currentImgIndex = index;
    const currentItem = activeItems[currentImgIndex];
    if (!currentItem) return;

    const imgSrc = currentItem.querySelector('img').src;
    const captionText = currentItem.querySelector('.gallery-overlay span').textContent;

    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = captionText;
    lightbox.classList.add('active');
  }

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const index = activeItems.indexOf(item);
      if (index !== -1) {
        openLightbox(index);
      }
    });
  });

  if (nextBtn && prevBtn && lightboxClose) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentImgIndex = (currentImgIndex + 1) % activeItems.length;
      openLightbox(currentImgIndex);
    });

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentImgIndex = (currentImgIndex - 1 + activeItems.length) % activeItems.length;
      openLightbox(currentImgIndex);
    });

    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') lightbox.classList.remove('active');
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
  });
});
