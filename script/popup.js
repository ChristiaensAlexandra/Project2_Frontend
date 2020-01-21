let deleteClient, background, deleteProgressiveScheme;

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

const ListenToDelete = function(element){
  element.addEventListener('click', onHandlerClickedPopUp); 
}

const getElements = function() {
  console.log("Get Elements"); 
  deleteClient = document.querySelectorAll('.js-client-delete');
  console.log(deleteClient); 
  background = document.querySelector('.js-background-popup');
  popup = document.querySelector('.c-popup-form');
  cancelButton = document.querySelector('.js-cancel');
  cancelButton.addEventListener('click', OnHandlerClickedCancel);
  deleteProgressiveScheme = document.querySelectorAll('.js-progressivescheme-delete');
  console.log(deleteProgressiveScheme);
  if(typeof deleteClient != 'undefined' && deleteClient.length > 0){
    console.log("Delete client"); 
    deleteClient.forEach(element => {
      ListenToDelete(element)}
      );
  }
  else if(typeof deleteProgressiveScheme != 'undefined' && deleteProgressiveScheme.length > 0){
    console.log("HIER"); 
    deleteProgressiveScheme.forEach(element => {
      ListenToDelete(element)}
      );
  }
};

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');
  getElements(); 
});