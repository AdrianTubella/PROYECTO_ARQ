document.addEventListener('DOMContentLoaded', () => {
    // ===== NAVEGACIÓN MEJORADA =====
    const sections = document.querySelectorAll('.section');
    const navBtns = document.querySelectorAll('.nav-btn');
    const mainContent = document.querySelector('.main');
  
    // Activar primera sección al cargar
    document.getElementById('resumen').classList.add('active');
  
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Actualizar estado visual
        navBtns.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        btn.classList.add('active');
        
        const targetId = btn.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        targetSection.classList.add('active');
  
        // Scroll suave (con soporte para accesibilidad)
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus({ preventScroll: true });
        mainContent.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  
    // ===== BOTÓN DE IMPRESIÓN MEJORADO =====
    const printBtn = document.createElement('button');
    printBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9V2h12v7"/>
        <path d="M6 15H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/>
        <rect x="6" y="13" width="12" height="8" rx="1"/>
      </svg>
      Imprimir Ponencia
    `;
    printBtn.className = 'print-btn';
    printBtn.setAttribute('aria-label', 'Generar versión para impresión');
    
    printBtn.addEventListener('click', () => {
      if (confirm('¿Desea generar una versión optimizada para impresión?\nIncluirá todos los contenidos y formato profesional.')) {
        // Añadir clase para impresión
        document.body.classList.add('printing');
        setTimeout(() => {
          window.print();
          document.body.classList.remove('printing');
        }, 300);
      }
    });
    
    document.body.appendChild(printBtn);
  
    // ===== MEJORAR ACCESIBILIDAD =====
    // Soporte para teclado en navegación
    navBtns.forEach((btn, index) => {
      btn.setAttribute('tabindex', '0');
      
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  
    // ===== EFECTO DE LECTURA (opcional) =====
    // Resaltar párrafos al hacer foco (para lectura en pantalla)
    const paragraphs = document.querySelectorAll('p, li');
    paragraphs.forEach(p => {
      p.addEventListener('focus', () => {
        p.style.backgroundColor = 'rgba(30, 86, 124, 0.05)';
      });
      p.addEventListener('blur', () => {
        p.style.backgroundColor = '';
      });
      p.setAttribute('tabindex', '0');
    });
  
    // ===== CARGA DIFERIDA DE IMÁGENES (si se añaden más adelante) =====
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
  
      document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
      });
    }
  });
  
  // Estilos para botón de impresión (agregados dinámicamente)
  const style = document.createElement('style');
  style.textContent = `
    .print-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--primary);
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: var(--border-radius);
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(13, 43, 69, 0.25);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: var(--transition);
    }
    .print-btn:hover {
      background: #154a76;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(13, 43, 69, 0.3);
    }
    .print-btn:focus {
      outline: 2px solid white;
      outline-offset: 2px;
    }
    @media print {
      .print-btn { display: none !important; }
    }
  `;
  document.head.appendChild(style);