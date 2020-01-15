let deleteClient, background, deleteProgressiveScheme;
if (deleteClient != null) {
  console.log('True 1');
  deleteClient.addEventListener('click', onHandlerClickedPopUp);
} else if (deleteProgressiveScheme != null) {
  console.log('True 2');
  deleteProgressiveScheme.addEventListener('click', onHandlerClickedPopUp);
}

const OnHandlerClickedCancel = function() {
  background.classList.remove('c-popup-blur');
  popup.style.display = 'none';
};

const onHandlerClickedPopUp = function() {
  //background blurry
  background.classList.add('c-popup-blur');
  //popup appears
  popup.style.display = 'block';
};

const getElements = function() {
  deleteClient = document.querySelector('.js-client-delete');
  background = document.querySelector('.js-background-popup');
  popup = document.querySelector('.c-popup-form');
  cancelButton = document.querySelector('.js-cancel');
  cancelButton.addEventListener('click', OnHandlerClickedCancel);
  deleteProgressiveScheme = document.querySelector('.js-progressivescheme-delete');
  console.log(deleteProgressiveScheme);
};

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');
  getElements();
});
