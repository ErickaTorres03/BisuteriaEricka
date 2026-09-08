document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    cargarSeccion("baner", "sections/baner.html"),
    cargarSeccion("header", "sections/header.html"),
    cargarSeccion("hero", "sections/hero.html"),
    cargarSeccion("categorias", "sections/categorias.html"),
    cargarSeccion("productos", "sections/productos.html"),
    cargarSeccion("promocion", "sections/promocion.html"),
    cargarSeccion("nosotros", "sections/nosotros.html"),
    cargarSeccion("testimonios", "sections/testimonios.html"),
    cargarSeccion("contacto", "sections/contacto.html"),
    cargarSeccion("footer", "sections/footer.html"),
  ]);

  inicializarScroll();
  inicializarMenu();
  inicializarNewsletter();
  inicializarTestimonios();
  inicializarWhatsApp();
});

async function cargarSeccion(id, archivo) {
  try {
    const elemento = document.getElementById(id);
    if (!elemento) {
      console.error(`No existe el contenedor #${id}`);
      return;
    }
    const respuesta = await fetch(archivo);
    if (!respuesta.ok) {
      throw new Error(`No se pudo cargar ${archivo}`);
    }
    const contenido = await respuesta.text();
    elemento.innerHTML = contenido;
  } catch (error) {
    console.error(error);
  }
}

function inicializarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) {
    console.warn("No se encontró #navbar");
    return;
  }
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("shadow-lg", window.scrollY > 50);
  });
}

/* Mobile menu */
function inicializarMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!menuBtn || !mobileMenu) {
    console.warn("No se encontró #menuBtn o #mobileMenu");
    return;
  }
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

function inicializarNewsletter() {
  const nlForm = document.getElementById("nlForm");
  if (!nlForm) {
    return;
  }
  nlForm.addEventListener("submit", function (e) {
    e.preventDefault();
    this.innerHTML = `
            <p class="text-gold-700 font-serif text-xl italic">
                ¡Gracias por suscribirte! ✦
            </p>
        `;
  });
}

function inicializarTestimonios() {
    const track = document.getElementById("testimonialTrack");
    const prevBtn = document.getElementById("prevTestimonial");
    const nextBtn = document.getElementById("nextTestimonial");
    if (!track) return;

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            const container = track.closest('.testimonial-wrap');
            const card = track.querySelector('.testimonial-card');
            const step = card ? card.offsetWidth + 24 : 350;
            if (container) {
                container.scrollBy({ left: -step, behavior: 'smooth' });
            }
        });
        nextBtn.addEventListener("click", () => {
            const container = track.closest('.testimonial-wrap');
            const card = track.querySelector('.testimonial-card');
            const step = card ? card.offsetWidth + 24 : 350;
            if (container) {
                container.scrollBy({ left: step, behavior: 'smooth' });
            }
        });
    }
}

function inicializarWhatsApp() {
  const numeroTelefono = "51981902522";

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-whatsapp");
    if (!btn) return;

    const nombre = btn.getAttribute("data-nombre") || "Producto";
    const precio = btn.getAttribute("data-precio") || "";
    const imagenRelativa = btn.getAttribute("data-imagen") || "";

    let imagenUrl = "";
    if (imagenRelativa) {
      const pathBase = window.location.pathname.endsWith('/') 
        ? window.location.pathname 
        : window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
      
      const cleanImage = imagenRelativa.startsWith('/') ? imagenRelativa.slice(1) : imagenRelativa;
      imagenUrl = `${window.location.origin}${pathBase}${cleanImage}`;
    }

    let mensaje = `Hola, estoy interesado(a) en el producto "${nombre}".\n`;
    if (precio) mensaje += `Precio: ${precio}\n`;
    mensaje += `Quiero comprarlo. ✨`;

    const whatsappUrl = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, "_blank");
  });
}
