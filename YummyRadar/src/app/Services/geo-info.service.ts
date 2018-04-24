import { Injectable } from '@angular/core';

export class GeoInfoService {
  constructor() { }
  getCities(state: string) {
    let cities: string[] = [];
    if (state == "IL" ) {
      cities = [
        "Saint Joseph",
        "Camargo",
        "Monticello",
        "Mohamet",
        "Homer",
        "Mansfield",
        "Ogden",
        "Champaign",
        "Urbana",
        "St Joseph",
        "Rantoul",
        "Tuscola",
        "Fisher",
        "Mahomet",
        "Philo",
        "Gifford",
        "Tolono",
        "Savoy",
        "Villa Grove",
        "Oakwood",
        "Sidney"
     ];
    } else if (state == "WI") {
      cities = [
        "Verona",
        "Mount Horeb",
        "Windsor",
        "Sun Prairie",
        "Fitchburg",
        "Stoughton",
        "Paoli",
        "Mc Farland",
        "De Forest",
        "Madison",
        "Middleton",
        "Monona",
        "DeForest",
        "McFarland",
        "Brooklyn",
        "Oregon",
        "Cottage Grove",
        "Waunakee",
        "Black Earth",
        "Belleville",
        "Dane",
        "Cross Plains",
        "Hawthorne",
        "Vilas",
        "Shorewood Hills"
     ];

    } else if (state == "SC") {
      cities = [
        "Indian Land",
        "Fort Mill",
        "Tega Cay",
        "Lake Wylie",
        "Ft. Mill",
        "Indian Lands",
        "Fort  Mill",
        "Indian Land"
     ];
    } 
    return cities;
  }

  getZipCodes(state: string) {
    let zipCodes: number[] = [];
    if (state == "IL") {
      zipCodes = [
        61821,
        61853,
        61880,
        61847,
        61801,
        61953,
        61864,
        61858,
        61802,
        61877,
        61820,
        61843,
        61874,
        61849,
        61854,
        61956,
        61803,
        60686,
        61866,
        61822,
        61856,
        61859,
        61873,
        61919
     ];
    } else if (state == "WI") {
      zipCodes = [
        53719,
        53717,
        53706,
        53528,
        53726,
        53711,
        53713,
        53518,
        53703,
        53575,
        53774,
        53593,
        53718,
        53714,
        53598,
        53532,
        53589,
        53527,
        53521,
        53702,
        53590,
        53704,
        53705,
        54842,
        53562,
        53597,
        53572,
        53529,
        53175,
        53716,
        53715,
        53515,
        53508,
        53558,
        54558
     ];
    } else if (state == "SC") {
      zipCodes = [
        29708,
        29732,
        29715,
        29710,
        29707,
        29716
     ];
    }
    return zipCodes;
  }
}

