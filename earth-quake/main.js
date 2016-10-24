"use strict";
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/observable/from');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/operator/map');
require('rxjs/add/observable/fromEvent');
require('rxjs/add/operator/debounce');
require('rxjs/add/operator/debounceTime');
var QUAKE_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
var map = L.map('map').setView([33.858631, -118.279602], 7);
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map);
//observer для click по документу, можно переделать для нужного нам елемента
var source = Observable_1.Observable.fromEvent(document, 'click')
    .map(function (event) { return ("Event time: " + event.timeStamp); })
    .subscribe(function (val) { return console.log(val); });
//observer для mousemove, получает данные каждые пол секунды
var event;
var move = Observable_1.Observable.fromEvent(document, 'mousemove')
    .map(function (event) { return event; })
    .debounceTime(500)
    .subscribe(function (val) { return console.log(val); });
var quakes = Observable_1.Observable.create(function (observer) {
    var req = new XMLHttpRequest();
    req.open('GET', QUAKE_URL);
    req.onload = function () {
        return observer.next(req.response);
    };
    req.send();
})
    .mergeMap(function (res) { return Observable_1.Observable.from(JSON.parse(res).features); })
    .map(function (_a) {
    var _b = _a.geometry.coordinates, x = _b[0], y = _b[1], _c = _a.properties, mag = _c.mag, type = _c.type, place = _c.place, code = _c.code;
    return {
        mag: mag,
        type: type,
        place: place,
        code: code,
        point: L.circle([y, x], mag * 10000)
    };
});
//создаем новый Subject
var mySubject = new Subject_1.Subject();
quakes.subscribe(function (_a) {
    var point = _a.point;
    point.addTo(map);
    //Запускаем его после каждого нового point
    mySubject.next(point);
});
mySubject.subscribe(function (p) {
    console.log(p);
    //ожидалось что el будет получаться каждый раз новый, на каждой созданный point
    var el = document.querySelector('path.leaflet-clickable');
});
//fromEvent 
