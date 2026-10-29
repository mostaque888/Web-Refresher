
const sessions = {
  saturday: [
    { time: '10:00 AM', title: 'Welcome & creative coffee', description: 'Meet fellow attendees and start the weekend.', type: 'Community' },
    { time: '11:30 AM', title: 'Make your own mini poster', description: 'Experiment with colours, shapes and typography.', type: 'Workshop' },
    { time: '2:00 PM', title: 'Ideas worth sharing', description: 'Short talks from creative local voices.', type: 'Talk' },
    { time: '4:00 PM', title: 'Sounds by the sea', description: 'Relax with an afternoon music showcase.', type: 'Live music' }
  ],
  sunday: [
    { time: '10:00 AM', title: 'Sunday sketch club', description: 'A relaxed introduction to drawing for everyone.', type: 'Workshop' },
    { time: '11:30 AM', title: 'Photography walk', description: 'Explore everyday details through a fresh lens.', type: 'Activity' },
    { time: '2:00 PM', title: 'From idea to project', description: 'Discover simple ways to get creative projects moving.', type: 'Talk' },
    { time: '4:00 PM', title: 'The community finale', description: 'Share creations and celebrate the weekend together.', type: 'Community' }
  ]
};

const scheduleList = document.querySelector('#schedule-list');
const dayButtons = document.querySelectorAll('.day-tab');


function displaySchedule(day) {
  scheduleList.replaceChildren();
  sessions[day].forEach(session => {
    const article = document.createElement('article');
    article.className = 'session';
    const time = document.createElement('time');
    time.textContent = session.time;
    const details = document.createElement('div');
    const heading = document.createElement('h3');
    heading.textContent = session.title;
    const description = document.createElement('p');
    description.textContent = session.description;
    details.append(heading, description);
    const tag = document.createElement('span');
    tag.className = 'session-tag';
    tag.textContent = session.type;
    article.append(time, details, tag);
    scheduleList.append(article);
  });
  dayButtons.forEach(button => {
    const selected = button.dataset.day === day;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

dayButtons.forEach(button => {
  button.addEventListener('click', () => displaySchedule(button.dataset.day));
});
displaySchedule('saturday');

const form = document.querySelector('#registration-form');
const fullName = document.querySelector('#full-name');
const email = document.querySelector('#email');
const dayChoice = document.querySelector('#day-choice');
const formMessage = document.querySelector('#form-message');

function showFieldError(input, errorId, message) {
  input.setAttribute('aria-invalid', String(Boolean(message)));
  document.getElementById(errorId).textContent = message;
}

form.addEventListener('submit', event => {
  event.preventDefault(); // No server connection or ticket booking in this demo.
  const name = fullName.value.trim();
  const address = email.value.trim();
  const nameError = name.length >= 2 ? '' : 'Please enter at least two characters.';
  const emailError = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address) ? '' : 'Enter a valid email address.';
  const dayError = dayChoice.value ? '' : 'Please choose a day.';
  showFieldError(fullName, 'name-error', nameError);
  showFieldError(email, 'email-error', emailError);
  showFieldError(dayChoice, 'day-error', dayError);
  formMessage.classList.remove('success');
  if (nameError || emailError || dayError) {
    formMessage.textContent = 'Please correct the highlighted fields.';
    return;
  }
  // The confirmation is local to the browser and no details are stored.
  formMessage.textContent = `Thanks, ${name}! Your interest in ${dayChoice.value} has been recorded for this demo only. No booking was made.`;
  formMessage.classList.add('success');
  form.reset();
});
