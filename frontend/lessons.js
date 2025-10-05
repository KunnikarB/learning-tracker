let currentCategory = '';
let currentSkill = '';
let showAll = false;

window.addEventListener('load', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  const params = new URLSearchParams(window.location.search);
  currentCategory = params.get('category');
  currentSkill = params.get('skill');
  showAll = params.get('all') === 'true';

  if (showAll) {
    document.getElementById('skillHeader').textContent = 'All Lessons';
    document.getElementById('skillName').textContent = '';
    document.getElementById('skillNameDisplay').textContent = 'All Skills';
    addLessonSection.style.display = 'none'; // Hide Add Lesson section
  } else if (!currentCategory || !currentSkill) {
    document.getElementById('skillHeader').textContent = 'All Lessons';
    document.getElementById('skillName').textContent = '';
    document.getElementById('skillNameDisplay').textContent = 'All Skills';
    addLessonSection.style.display = 'none'; // Hide if no skill selected
  } else {
    document.getElementById(
      'skillHeader'
    ).textContent = `${currentSkill} Lessons`;
    document.getElementById('skillName').textContent = currentSkill;
    document.getElementById('skillNameDisplay').textContent = currentSkill;
    addLessonSection.style.display = 'block'; // Show section
  }

  displayLessons();
});

// Add lesson
function addLesson() {
  const title = document.getElementById('lessonTitle').value.trim();
  const link = document.getElementById('lessonLink').value.trim();
  const note = document.getElementById('lessonNote').value.trim();

  if (!title) {
    alert('Please enter a lesson title.');
    return;
  }

  // For All Lessons view, prevent adding
  if (showAll) {
    alert('Cannot add lessons in All Lessons view. Select a skill first.');
    return;
  }

  const storageKey = currentSkill
    ? `${currentCategory}-${currentSkill}-lessons`
    : 'lessons';

  const lessons = JSON.parse(localStorage.getItem(storageKey)) || [];
  lessons.push({ title, link, note });
  localStorage.setItem(storageKey, JSON.stringify(lessons));

  document.getElementById('lessonTitle').value = '';
  document.getElementById('lessonLink').value = '';
  document.getElementById('lessonNote').value = '';

  displayLessons();
}

// Display lessons
function displayLessons() {
  let lessons = [];
  let storageKeys = [];

  if (showAll) {
    storageKeys = Object.keys(localStorage).filter((k) =>
      k.endsWith('-lessons')
    );
    storageKeys.forEach((key) => {
      const skillLessons = JSON.parse(localStorage.getItem(key)) || [];
      skillLessons.forEach((l) => lessons.push({ ...l, skillKey: key }));
    });
  } else {
    const storageKey = currentSkill
      ? `${currentCategory}-${currentSkill}-lessons`
      : 'lessons';
    storageKeys = [storageKey];
    lessons = JSON.parse(localStorage.getItem(storageKey)) || [];
  }

  const list = document.getElementById('lessonsList');
  list.innerHTML = '';

  lessons.forEach((lesson, index) => {
    const skillLabel =
      showAll && lesson.skillKey
        ? ` (${lesson.skillKey.replace('-lessons', '')})`
        : '';
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${lesson.title}</strong>${skillLabel}
      ${
        lesson.link
          ? `  <a href="${lesson.link}" target="_blank">👉🏻 Link</a>`
          : ''
      }
      <p>${lesson.note || ''}</p>
      <button onclick="deleteLesson(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

// Delete lesson
function deleteLesson(index) {
  if (showAll) {
    // Delete from correct skill
    let lessonsFlat = [];
    const storageKeys = Object.keys(localStorage).filter((k) =>
      k.endsWith('-lessons')
    );
    let cumulativeIndex = 0;
    for (const key of storageKeys) {
      const skillLessons = JSON.parse(localStorage.getItem(key)) || [];
      if (index < cumulativeIndex + skillLessons.length) {
        // Delete this lesson
        skillLessons.splice(index - cumulativeIndex, 1);
        localStorage.setItem(key, JSON.stringify(skillLessons));
        break;
      }
      cumulativeIndex += skillLessons.length;
    }
  } else {
    const storageKey = currentSkill
      ? `${currentCategory}-${currentSkill}-lessons`
      : 'lessons';
    const lessons = JSON.parse(localStorage.getItem(storageKey)) || [];
    lessons.splice(index, 1);
    localStorage.setItem(storageKey, JSON.stringify(lessons));
  }

  displayLessons();
}
