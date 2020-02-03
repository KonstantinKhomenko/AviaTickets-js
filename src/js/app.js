import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';
import favoriteTickets from './store/favoriteTickets';
import favoriteUI from './views/favorite';

document.addEventListener('DOMContentLoaded', e => {
  const form = formUI.form;
  const favoriteBtn = document.querySelector('.dropdown-trigger');

  // Events
  initApp();
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
  });

  // Add favorites
  ticketsUI.container.addEventListener('click', e => {
    if(e.target.classList.contains('add-favorite')){
      const key = e.target.parentElement.getAttribute('id');
      const favTicket = locations.lastSearch.find(item => item.id == key);
      favoriteTickets.setFavorite(favTicket);
    }
  });

  // Delete favorites

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }

});