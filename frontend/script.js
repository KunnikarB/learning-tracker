const skills = {
  frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'GitHub'],
  backend: [
    'TypeScript',
    'REST API',
    'Node.js',
    'Express',
    'PostgreSQL',
    'MongoDB',
  ],
  uxui: ['Photoshop', 'Adobe Illustrator', 'Figma'],
  swedish: ['Grammar', 'Vocabulary', 'Conversation'],
  english: ['Grammar', 'Vocabulary', 'Conversation'],
};

window.addEventListener('load', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  Object.keys(skills).forEach((category) => renderSkills(category));
  updateSummary();
});

function renderSkills(category) {
  const container = document.getElementById(`${category}Skills`);
  if (!container) return; // Skip if container doesn't exist
  container.innerHTML = '';
  const savedProgress =
    JSON.parse(localStorage.getItem(`${category}Progress`)) || {};

  skills[category].forEach((skill) => {
    const value = savedProgress[skill] || 0;
    const div = document.createElement('div');
    div.className = 'topic';
    div.innerHTML = `
      <label>${skill}</label>
      <progress id="${category}-${skill}" value="${value}" max="100"></progress>
      <span>${value}%</span>
      <button class="progress-btn" onclick="updateProgress('${category}','${skill}')">+10%</button>
      <button class="lessons-btn" onclick="openLessons('${category}','${skill}')">📖 Lessons</button>
    `;
    container.appendChild(div);
  });
}

// Update single skill progress
function updateProgress(category, skill) {
  const progress = document.getElementById(`${category}-${skill}`);
  const span = progress.nextElementSibling;
  let value = parseInt(progress.value) + 10;
  if (value > 100) value = 100;
  progress.value = value;
  span.textContent = `${value}%`;
  saveProgress(category, skill, value);
  updateSummary();
}

// Save skill progress in localStorage
function saveProgress(category, skill, value) {
  const saved = JSON.parse(localStorage.getItem(`${category}Progress`)) || {};
  saved[skill] = value;
  localStorage.setItem(`${category}Progress`, JSON.stringify(saved));
}

// Update summary for all categories dynamically
function updateSummary() {
  Object.keys(skills).forEach((category) => {
    const saved = JSON.parse(localStorage.getItem(`${category}Progress`)) || {};
    const values = skills[category].map((skill) => saved[skill] || 0);
    const avg = skills[category].length
      ? Math.round(values.reduce((a, b) => a + b, 0) / skills[category].length)
      : 0;
    const summaryBar = document.getElementById(`${category}Summary`);
    const summaryText = document.getElementById(`${category}SummaryPercent`);
    if (summaryBar) summaryBar.value = avg;
    if (summaryText) summaryText.textContent = `${avg}%`;
  });
}

// Add new skill dynamically
function addSkill(category) {
  const newSkill = prompt(`Enter a new ${category} skill:`)?.trim();
  if (newSkill && !skills[category].includes(newSkill)) {
    skills[category].push(newSkill);
    saveProgress(category, newSkill, 0);
    renderSkills(category);
  } else if (skills[category].includes(newSkill)) {
    alert('That skill already exists!');
  }
}

// Reset all progress
function resetProgress() {
  if (confirm('Are you sure you want to reset all progress?')) {
    Object.keys(skills).forEach((category) =>
      localStorage.removeItem(`${category}Progress`)
    );
    Object.keys(skills).forEach((category) => renderSkills(category));
    updateSummary();
  }
}

// Open lessons page for skill
function openLessons(category, skill) {
  window.location.href = `lessons.html?category=${encodeURIComponent(
    category
  )}&skill=${encodeURIComponent(skill)}`;
}
