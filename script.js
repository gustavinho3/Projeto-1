// Mostrar botão "Voltar ao Topo" quando rolar
const backToTop = document.getElementById("backToTop");
window.onscroll = () => {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
  updateActiveMenuOnScroll();
};

// Rolar suavemente para o topo ao clicar no botão
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Seleciona todos os links do menu (nav)
const menuLinks = document.querySelectorAll("nav a");

menuLinks.forEach(link => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    // Só previne o comportamento padrão e faz scroll suave para links internos (âncoras)
    if (href.startsWith("#")) {
      event.preventDefault();

      // Remove active de todos os links e adiciona ao clicado
      menuLinks.forEach(link => link.classList.remove("active"));
      link.classList.add("active");

      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
    // Links externos (não começam com #) funcionam normalmente, sem interferência
  });
});

// Atualizar menu ativo conforme rolagem da página
function updateActiveMenuOnScroll() {
  const fromTop = window.scrollY + 100; // Ajusta o ponto para ativar

  menuLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href.startsWith("#")) return; // Ignora links externos

    const section = document.querySelector(href);
    if (section) {
      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        menuLinks.forEach(link => link.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
}
