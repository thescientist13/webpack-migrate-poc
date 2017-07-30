import jQuery from 'jquery';
import './index.scss';

function bootstrap() {
  const greetingText = 'Hello World!';
  const greetingElement = jQuery('<h1>').html(greetingText).addClass('greeting');

  jQuery('body').append(greetingElement);
}

window.onload = bootstrap;