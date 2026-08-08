// ============================================================
// TAAC — The Agentic AI Confluence
// script.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Countdown timer ---------------- */
  // Registration closes at the event start: 5 Sept 2026, 1:00 PM IST
  const EVENT_DATE = new Date('2026-09-05T13:00:00+05:30').getTime();

  const cdDays  = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins  = document.getElementById('cdMins');
  const cdSecs  = document.getElementById('cdSecs');

  function updateCountdown(){
    const now = Date.now();
    const diff = EVENT_DATE - now;

    if (diff <= 0){
      [cdDays, cdHours, cdMins, cdSecs].forEach(el => { if (el) el.textContent = '00'; });
      return;
    }
    const pad = n => String(n).padStart(2, '0');
    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins  = Math.floor((diff / (1000 * 60)) % 60);
    const secs  = Math.floor((diff / 1000) % 60);

    if (cdDays)  cdDays.textContent  = pad(days);
    if (cdHours) cdHours.textContent = pad(hours);
    if (cdMins)  cdMins.textContent  = pad(mins);
    if (cdSecs)  cdSecs.textContent  = pad(secs);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------------- Scroll reveal ---------------- */
  const revealTargets = document.querySelectorAll(
    '.why-card, .topic-item, .speaker-card, .tl-item, .testi-card, .faq-item'
  );
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    io.observe(el);
  });

  /* ---------------- Sticky CTA visibility ---------------- */
  const stickyCta = document.getElementById('stickyCta');
  const ticketsSection = document.getElementById('tickets');
  if (stickyCta && ticketsSection){
    const ticketsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        stickyCta.style.display = entry.isIntersecting ? 'none' : 'flex';
      });
    }, { threshold: 0.2 });
    ticketsObserver.observe(ticketsSection);
  }

  /* ---------------- Razorpay checkout (placeholder) ---------------- */
  const razorpayBtn = document.getElementById('razorpayBtn');
  if (razorpayBtn){
    razorpayBtn.addEventListener('click', () => {

      // NOTE: Replace 'rzp_test_XXXXXXXXXXXX' with your live/test Razorpay Key ID.
      // For production, order creation should happen on your backend (never expose
      // key_secret on the client) — this is a front-end placeholder only.
      const options = {
        key: 'rzp_test_XXXXXXXXXXXX',
        amount: 199 * 100, // amount in paise
        currency: 'INR',
        name: 'The Agentic AI Confluence (TAAC)',
        description: 'Regular Pass — 5 Sept 2026, Pune',
        image: '',
        handler: function (response){
          alert('Payment successful! Reference: ' + (response.razorpay_payment_id || 'N/A'));
          // TODO: verify payment signature server-side and send confirmation email/WhatsApp.
        },
        prefill: { name: '', email: '', contact: '' },
        notes: { event: 'TAAC 2026' },
        theme: { color: '#398FA1' }
      };

      if (typeof Razorpay !== 'undefined'){
        const rzp = new Razorpay(options);
        rzp.open();
      } else {
        // Razorpay checkout.js script not loaded in this preview environment.
        alert('Razorpay checkout will open here once the Razorpay script is included on the live site. See script.js for setup notes.');
      }
    });
  }

});
