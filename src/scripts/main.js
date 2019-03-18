import jquery from 'jquery';

import inputs from './modules/inputs';
import chart from './modules/chart';
import telMask from './modules/telMask';
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

// export for others scripts to use
window.$ = jquery;
window.jQuery = jquery;

calendar();
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
telMask();
inputFile();






