import React, {Component} from 'react';
import {ListView,} from 'react-native';

export default class AppLoader {
	
	newsList: '';
	
	constructor(){}
	
	init(){
		newsList = this.getNewsFromApi();
	}
	
	getNewsFromApi(){
		
		
		/*let actualites =  fetch('http://centoapp.centaure-systems.fr/api/1/news/list',{ 
											method: 'GET',
										  	headers: {
												'Accept': 'application/json',
												'Content-Type': 'application/json',
										  	}
										}).then((response) => (response.json())).then((json) => { console.log('json :', json)});
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		let test = fetch('http://centoapp.centaure-systems.fr/api/1/news/list').then(reponse => response.json())
  														.then(json => console.log(json.id))
		let actualites = ds.cloneWithRows(fetch('http://centoapp.centaure-systems.fr/api/1/news/list'));
		let actualites = fetch('http://centoapp.centaure-systems.fr/api/1/news/list')
							.then((response) => response.json())
						  	.then((responseJson) => {
								return responseJson;
						  	})
						  	.catch((error) => {
								console.error(error);
						  	});		
		console.log('liste actu : ', JSON.stringify(actualites));
		console.log('test : ', test);*/
		let actualites = fetch('http://centoapp.centaure-systems.fr/api/1/news/list')
							.then((response) => {
								return response;
						  	})
						  	.catch((error) => {
								console.error(error);
						  	});
		console.log("actualites : ", actualites);
		return actualites;
	}
}