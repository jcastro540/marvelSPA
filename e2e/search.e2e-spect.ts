import {  browser, element, by} from 'protractor';  

describe('search', () => {

 it('Buscar heroe', function(){
    browser.get('/home')
   
	  element(by.css('input[name=heroe]')).sendKeys('spider');

	  expect(element(by.css('input[name=email]')).isPresent()).toBeFalsy();

 	  element(by.css('.card .row .col-sm-6 .btn-danger:nth-child(1)')).click();

 	  expect(element(by.css('card .row .col-sm-6 .btn-danger:nth-child(1)')).isPresent()).toBeFalsy();

 	  element(by.css('btn-random')).click();

 	  expect(element(by.css('btn-random')).isPresent()).toBeFalsy();

	})

});

