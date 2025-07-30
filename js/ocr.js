document.addEventListener('DOMContentLoaded', () => {
  const mainCardsContainer = document.getElementById('mainCards');
  const panelContent = document.getElementById('panelContent');
  const slidePanel = document.querySelector('.slide-panel');
  let currentPdfUrl = ''; // PDF link store karne ke liye

  // Code extract karne ka function
  window.extractCodeAndShow = function(button) {
    const card = button.closest('.card');
    const img = card.querySelector('img');
    const modalBody = document.getElementById('modalCodeContent');

    modalBody.textContent = '⏳ Extracting code...';

    Tesseract.recognize(img.src, 'eng')
      .then(({ data: { text } }) => {
        const code = text.trim() || '⚠️ No code found';
        modalBody.textContent = code;
      })
      .catch(err => {
        console.error(err);
        modalBody.textContent = '❌ Failed to extract code.';
      });
  };

  // Modal me code copy karne ka function
  window.copyModalCode = function() {
    const code = document.getElementById('modalCodeContent').textContent;
    navigator.clipboard.writeText(code)
      .then(() => alert('✅ Code copied!'))
      .catch(() => alert('❌ Failed to copy code.'));
  };

  // Explanation modal content aur PDF link set karne ka function
  window.setModalContent = function(htmlContent, pdfUrl) {
    document.getElementById('modalBodyContent').innerHTML = htmlContent || '';

    const downloadBtn = document.getElementById('downloadPdfBtn');
    const viewBtn = document.getElementById('viewPdfBtn');

    if (pdfUrl) {
      downloadBtn.href = pdfUrl;
      downloadBtn.style.display = 'inline-block';

      viewBtn.style.display = 'inline-block';

      currentPdfUrl = pdfUrl;
    } else {
      downloadBtn.style.display = 'none';
      viewBtn.style.display = 'none';

      currentPdfUrl = '';
    }
  };

  // Image click par image modal show karna
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('.card img')) {
      const modalImage = document.getElementById('modalImage');
      modalImage.src = e.target.src;
      const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
      imageModal.show();
    }
  });

  // Search input filter function
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const cards = mainCardsContainer.querySelectorAll('.card');
    cards.forEach(card => {
      const keywords = card.getAttribute('data-keyword').toLowerCase();
      card.style.display = keywords.includes(query) ? 'block' : 'none';
    });
  });

  // Category ke hisaab se cards side panel me show karna
  window.showFilteredCards = function(category) {
    panelContent.innerHTML = '';

    const allCards = mainCardsContainer.querySelectorAll('.card');
    const filtered = category === 'all' ? [...allCards] : [...allCards].filter(card => card.dataset.cat === category);

    if (filtered.length === 0) {
      panelContent.innerHTML = '<p style="color:white;">No cards found for this category.</p>';
    } else {
      filtered.forEach(card => {
        const clone = card.cloneNode(true);
        panelContent.appendChild(clone);
      });
    }

    slidePanel.classList.add('open');
  };

  // Side panel close karne ka button
  document.getElementById('closePanel').addEventListener('click', () => {
    slidePanel.classList.remove('open');
  });

  // Side panel me buttons ke click handle karna
  panelContent.addEventListener('click', (e) => {
    const target = e.target;

    if (target.matches('button.btn-primary')) {
      // Code extract karne wala button
      extractCodeAndShow(target);
    } else if (target.matches('button.btn-info')) {
      // Explanation show karne wala button
      const card = target.closest('.card');
      if (!card) return;

      // HTML content aur PDF url card ke button ke onclick se aayega, 
      // toh yaha koi hardcoded PDF URL nahi lagana.
      // Tumhare html me onclick me setModalContent() call ho raha hai,
      // isliye yeh function JS me sirf modal open karega.
    } else if (target.id === 'copyCodeBtn') {
      // Code copy karne wala button
      window.copyModalCode();
    }
  });

  // View PDF button ka click event (modal me PDF iframe me dikhaega)
  document.getElementById('viewPdfBtn').addEventListener('click', () => {
    if (!currentPdfUrl) return;

    const pdfIframe = document.getElementById('pdfViewerIframe');
    pdfIframe.src = encodeURI(currentPdfUrl);

    const pdfModal = new bootstrap.Modal(document.getElementById('pdfViewerModal'));
    pdfModal.show();
  });

  // PDF viewer modal band hone par iframe src clear kar dena (cache problem avoid karne ke liye)
  const pdfModalEl = document.getElementById('pdfViewerModal');
  pdfModalEl.addEventListener('hidden.bs.modal', () => {
    document.getElementById('pdfViewerIframe').src = '';
  });
});
  function setModalContent(contentHTML, pdfUrl) {
    // Set the explanation content in modal
    document.getElementById('modalContent').innerHTML = contentHTML;

    // Set the href for download button
    const downloadBtn = document.getElementById('downloadPdfBtn');
    downloadBtn.href = pdfUrl;
    downloadBtn.style.display = 'inline-block';

    // Set the href for view PDF button
    const viewBtn = document.getElementById('viewPdfLink');
    viewBtn.href = pdfUrl;
    viewBtn.setAttribute('target', '_blank');
  }
   // When modal shows, update title and content based on clicked link
  const infoModal = document.getElementById('infoModal');
  infoModal.addEventListener('show.bs.modal', event => {
    const trigger = event.relatedTarget; // the clicked link
    const title = trigger.getAttribute('data-title');
    const content = trigger.getAttribute('data-content');

    infoModal.querySelector('.modal-title').textContent = title;
    infoModal.querySelector('.modal-body').textContent = content;
  });
  document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault(); // form submit default rok do

  const name = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const message = document.getElementById('messageInput').value.trim();

  // Simple validation (already required in HTML, extra safety)
  if (!name || !email || !message) {
    alert('Please fill all fields.');
    return;
  }

  // Yahan aap apne backend ko request bhej sakte hain, filhal demo alert:
  alert(`Thank you, ${name}! Your message has been sent.`);

  // Form reset kar do
  this.reset();

  // Modal band karo
  const contactModalEl = document.getElementById('contactModal');
  const modal = bootstrap.Modal.getInstance(contactModalEl);
  modal.hide();
});
