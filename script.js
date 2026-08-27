document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });

  // 2. Dynamic Price & Group Discount Calculation
  const packageSelect = document.getElementById('packageSelect');
  const guestCountInput = document.getElementById('guestCount');
  const grandTotalElem = document.getElementById('grandTotal');

  function calculateBill() {
    const rate = parseFloat(packageSelect.value) || 750;
    const guests = parseInt(guestCountInput.value) || 1;
    let total = rate * guests;

    // Apply 10% discount for 10 or more guests
    if (guests >= 10) {
      total = total * 0.9;
    }

    grandTotalElem.textContent = `₹${total.toLocaleString('en-IN')}`;
  }

  packageSelect.addEventListener('change', calculateBill);
  guestCountInput.addEventListener('input', calculateBill);

  window.selectPackage = function(type, price) {
    packageSelect.value = price;
    calculateBill();
  };

  // 3. Booking Request Handler
  const form = document.getElementById('agriBookingForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('guestName').value;
    const phone = document.getElementById('contactNumber').value;
    const date = document.getElementById('visitDate').value;
    const total = grandTotalElem.textContent;

    alert(
      `🙏 Dhanyawad ${name}!\n\nWe have received your enquiry for ${date}.\nEstimated Booking Amount: ${total}.\nOur coordinator will call you at ${phone} to confirm availability.`
    );
    form.reset();
    calculateBill();
  });

  // ================= 4. GALLERY FILTER & LIGHTBOX =================
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

  // Filtering Logic
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

  // Open Lightbox
  function openLightbox(index) {
    currentImgIndex = index;
    const currentItem = activeItems[currentImgIndex];
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

  // Lightbox Controls
  function nextImage() {
    currentImgIndex = (currentImgIndex + 1) % activeItems.length;
    openLightbox(currentImgIndex);
  }

  function prevImage() {
    currentImgIndex = (currentImgIndex - 1 + activeItems.length) % activeItems.length;
    openLightbox(currentImgIndex);
  }

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nextImage();
  });

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevImage();
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') lightbox.classList.remove('active');
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
});

