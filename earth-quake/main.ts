import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject'
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/debounce'
import 'rxjs/add/operator/debounceTime'

const QUAKE_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
const map = L.map('map').setView([33.858631, -118.279602], 7);
L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`).addTo(map);

//observer для click по документу, можно переделать для нужного нам елемента
const source = Observable.fromEvent(document, 'click')
  .map(event => `Event time: ${event.timeStamp}`)
  .subscribe(val => console.log(val));

//observer для mousemove, получает данные каждые пол секунды
let event;
const move = Observable.fromEvent(document, 'mousemove')
  .map((event) => event)
  .debounceTime(500)
  .subscribe(val => console.log(val));

let quakes: Observable<any> = Observable.create(observer => {
    let req = new XMLHttpRequest();
    req.open('GET', QUAKE_URL);
    req.onload = () => {
        return observer.next(req.response)
    };
    req.send();
})
    .mergeMap((res: any): Observable<any> => Observable.from(JSON.parse(res).features))
    .map(({geometry:{coordinates:[x,y]}, properties:{mag, type, place, code}}) => {
        return {
            mag,
            type,
            place,
            code,
            point: L.circle([y, x], mag * 10000)
        }
    });

//создаем новый Subject
var mySubject = new Subject();
quakes.subscribe(({point}) => {
    point.addTo(map);
    //Запускаем его после каждого нового point
    mySubject.next(point);
});

mySubject.subscribe((p)=>{
    console.log(p);
    //ожидалось что el будет получаться каждый раз новый, на каждой созданный point
    let el = document.querySelector('path.leaflet-clickable');
});
//fromEvent