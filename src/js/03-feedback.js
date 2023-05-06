import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInputData, 500));
populateTextarea();

let formData = {};

function onInputData(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (form.email.value === '' || form.message.value === '') {
    return alert('Please fill in all the fields!');
  }
  evt.currentTarget.reset();
  localStorage.removeItem(LOCAL_KEY);
  console.log(formData);
  formData = {};
}

function populateTextarea() {
  const savedData = localStorage.getItem(LOCAL_KEY);
  if (savedData !== null) {
    const parsedData = JSON.parse(savedData);

    if (parsedData.message !== undefined) {
      form.message.value = parsedData.message;
    }

    if (parsedData.email !== undefined) {
      form.email.value = parsedData.email;
    }
  }
}
