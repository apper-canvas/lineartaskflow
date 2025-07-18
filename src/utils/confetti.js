export const createConfetti = (x, y) => {
  const colors = ["#FFB347", "#5B47E0", "#22C55E", "#EF4444", "#3B82F6"];
  const confettiCount = 12;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = `${Math.random() * 0.3}s`;
    confetti.style.animationDuration = `${0.8 + Math.random() * 0.4}s`;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      confetti.remove();
    }, 1200);
  }
};