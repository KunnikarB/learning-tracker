const API_URL =
  'https://learning-tracker-nj04qff8e-kunnikars-projects.vercel.app/'; 

// Fetch lessons for a specific category & skill
export async function getLessons(category, skill) {
  try {
    const res = await fetch(`${API_URL}/${category}/${skill}`);
    return await res.json();
  } catch (err) {
    console.error('Error fetching lessons:', err);
    return [];
  }
}

// Fetch all lessons
export async function getAllLessons() {
  try {
    const res = await fetch(API_URL);
    return await res.json();
  } catch (err) {
    console.error('Error fetching all lessons:', err);
    return [];
  }
}

// Add a new lesson
export async function addLessonToDB(lesson) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lesson),
    });
    return await res.json();
  } catch (err) {
    console.error('Error adding lesson:', err);
  }
}

// Delete a lesson
export async function deleteLessonFromDB(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  } catch (err) {
    console.error('Error deleting lesson:', err);
  }
}
