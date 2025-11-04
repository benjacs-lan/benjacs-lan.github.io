// Import AOS library
import AOS from "aos"

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
})

// Navbar scroll effect
const navbar = document.querySelector(".navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar.style.padding = "0.5rem 0"
    navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.5)"
  } else {
    navbar.style.padding = "1rem 0"
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)"
  }

  lastScroll = currentScroll
})

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show")
      }
    }
  })
})

// Theme toggle
const themeToggle = document.getElementById("themeToggle")
const html = document.documentElement
const body = document.body

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem("theme") || "dark"
body.setAttribute("data-theme", currentTheme)

// Update icon based on current theme
updateThemeIcon(currentTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)
})

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i")
  if (theme === "dark") {
    icon.classList.remove("fa-moon")
    icon.classList.add("fa-sun")
  } else {
    icon.classList.remove("fa-sun")
    icon.classList.add("fa-moon")
  }
}

// Typing effect for hero section
const typingText = document.querySelector(".typing-text")
if (typingText) {
  const text = typingText.textContent
  typingText.textContent = ""
  let i = 0

  function typeWriter() {
    if (i < text.length) {
      typingText.textContent += text.charAt(i)
      i++
      setTimeout(typeWriter, 100)
    }
  }

  // Start typing effect after page load
  setTimeout(typeWriter, 500)
}

// Animate skill bars on scroll
const skillBars = document.querySelectorAll(".progress-bar")
const animateSkills = () => {
  skillBars.forEach((bar) => {
    const barPosition = bar.getBoundingClientRect().top
    const screenPosition = window.innerHeight

    if (barPosition < screenPosition) {
      const width = bar.style.width
      bar.style.width = "0"
      setTimeout(() => {
        bar.style.width = width
      }, 100)
    }
  })
}

// Run once on scroll
let skillsAnimated = false
window.addEventListener("scroll", () => {
  if (!skillsAnimated) {
    const skillsSection = document.getElementById("skills")
    const skillsPosition = skillsSection.getBoundingClientRect().top
    const screenPosition = window.innerHeight

    if (skillsPosition < screenPosition) {
      animateSkills()
      skillsAnimated = true
    }
  }
})

// Contact form submission
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // Here you would typically send the form data to a server
    console.log("Form submitted:", { name, email, subject, message })

    // Show success message (you can customize this)
    alert("¡Gracias por tu mensaje! Te responderé pronto.")

    // Reset form
    contactForm.reset()
  })
}

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroContent = document.querySelector(".hero-content")

  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`
    heroContent.style.opacity = 1 - scrolled * 0.002
  }
})

// Animate numbers in stats
const animateValue = (element, start, end, duration) => {
  let startTimestamp = null
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp
    const progress = Math.min((timestamp - startTimestamp) / duration, 1)
    const value = Math.floor(progress * (end - start) + start)
    element.textContent = value + (element.dataset.suffix || "")
    if (progress < 1) {
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}

// Observe stats section
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number")
        statNumbers.forEach((stat) => {
          const text = stat.textContent
          const number = Number.parseInt(text.replace(/\D/g, ""))
          const suffix = text.replace(/[0-9]/g, "")
          stat.dataset.suffix = suffix
          animateValue(stat, 0, number, 2000)
        })
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const aboutSection = document.getElementById("about")
if (aboutSection) {
  statsObserver.observe(aboutSection)
}

// Add hover effect to project cards
const projectCards = document.querySelectorAll(".project-card")
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Console message for developers
console.log("%c¡Hola Developer! 👋", "color: #00d9ff; font-size: 20px; font-weight: bold;")
console.log(
  "%cSi estás viendo esto, probablemente te interesa el código. ¡Contáctame!",
  "color: #00ff88; font-size: 14px;",
)
console.log("%calex@devops.com", "color: #ffffff; font-size: 14px;")
