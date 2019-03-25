import jquery from 'jquery';

import renderPage from './modules/renderPage';
import notActive from './modules/notActive';
import fixedMenu from './modules/fixedMenu';

//общая инофрмация
import chart from './modules/chart';
import inputFile from './modules/inputFile';
import selectList from './modules/selectInput';
import calendar from './modules/calendar';
import block from './modules/block';
import popup from './modules/popup';
import masks from './modules/masks';

//вебинар
// import dropdownSearch from './modules/dropdownSearch';
import inputTime from './modules/inputTime';
import landBlockAcc from './modules/landBlockAcc';
import webiraySubscribe from './modules/webiraySubscribe';
import socials from './modules/socials';
import radioLogos from './modules/radioLogos';
import paymentAcc from './modules/paymentAcc';
import match from './modules/match';

import tags from './modules/tags';
//аккаунт
import inputs from './modules/inputs';

// export for others scripts to use
window.$ = jquery;
window.jQuery = jquery;

renderPage();
notActive();
fixedMenu();

masks();
popup();
block();
chart();
inputFile();
selectList();
calendar('webinar-calendar');
calendar('main-calendar');

tags('tag-search');

inputTime();
// dropdownSearch();
landBlockAcc();
webiraySubscribe();
socials();
radioLogos();
paymentAcc();
match();

inputs();


