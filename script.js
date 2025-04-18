// Fetch GitHub Repos
const projectContainer = document.getElementById('github-projects');

fetch('https://api.github.com/users/PaluruSubbaNarasaiah/repos')
  .then(res => res.json())
  .then(data => {
    data.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description provided.'}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
      projectContainer.appendChild(card);
    });
  })
  .catch(err => console.error('Error loading GitHub repos:', err));


// Scroll to Top Button
const scrollBtn = document.getElementById('scrollTopBtn');
window.onscroll = function () {
  scrollBtn.style.display = (document.documentElement.scrollTop > 300) ? "block" : "none";
};

scrollBtn.onclick = () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};


// Canvas Animated Background
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 100; i++) {
    particlesArray.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    let p = particlesArray[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = '#00ffff';
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX = -p.speedX;
    if (p.y < 0 || p.y > canvas.height) p.speedY = -p.speedY;
  }

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});
