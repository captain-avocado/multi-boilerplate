import jquery from 'jquery';
import renderForm from './modules/renderForm';


import inputs from './modules/inputs';
import chart from './modules/chart';
import inputFile from './modules/inputFile';
import dropdownSearch from './modules/dropdownSearch';
import infoTypes from './modules/infoTypes';
import selectList from './modules/selectInput';
import inputTime from './modules/inputTime';
import match from './modules/match';
import radioLogos from './modules/radioLogos';
import paymentNeed from './modules/paymentNeed';
import landings from './modules/landings';
import webiraySubscribe from './modules/webiraySubscribe';
import calendar from './modules/calendar';
import masks from './modules/masks';

// export for others scripts to use
window.$ = jquery;
window.jQuery = jquery;
window.changeWD = new Event('changeWD');


renderForm();

calendar('form-calendar');
webiraySubscribe();
landings();
paymentNeed();
radioLogos();
match();
inputTime();
selectList();
infoTypes();
dropdownSearch();
inputs();
chart();
inputFile();
masks();








