// import {Observable} from 'rxjs/Observable';
// import  'rxjs/add/observable/from';
//
// let  sequence:Observable<string> = Observable.from(['Hi','rxjs','!!!']);
// sequence.subscribe((res:string)=>console.log(res));
// interface Ilistner {
//     update(message: string): void;
// }
//
// interface IObserver {
//     add(listener: Ilistner): void;
//     remove(listener: Ilistner): void;
//     notify(message: string): void;
// }
//
// class Observer implements IObserver {
//     private _listeners: Ilistner[] = [];
//
//     public add(listener: Ilistner) {
//         this._listeners.push(listener);
//     }
//
//     public remove(listener: Ilistner) {
//         this._listeners.splice(this._listeners.indexOf(listener), 1);
//     }
//
//     public notify(message: string): void {
//         this._listeners.forEach((listener: Ilistner): void => listener.update(message))
//     }
// }
//
// let listener_1:Ilistner ={
//     update(message: string){
//         console.log(`Listener_1: ${message}`)
//     }
// }
// let listener_2:Ilistner ={
//     update(message: string){
//         console.log(`Listener_2: ${message}`)
//     }
// }
// let listener_3:Ilistner ={
//     update(message: string){
//         console.log(`Listener_3: ${message}`)
//     }
// }
//
// let observer = new Observer();
// observer.add(listener_1);
// observer.add(listener_2);
// observer.add(listener_3);
// observer.remove(listener_2);
// observer.notify('TypeScript -> cool !!!!');
//
// interface IIterator {
//     next(): any;
//     hasNext(): boolean;
// }
//
// class Iterator implements IIterator {
//     private _cursor: number = 0;
//     private _array: any[];
//     private _divisor: number;
//
//     constructor(array: any[], divisor: number = 1) {
//         this._array = array;
//         this._divisor = divisor;
//     }
//
//     public next() {
//         for (let i = this._cursor; i < this._array.length; i++) {
//             let value = this._array[i];
//             if (value % this._divisor === 0) {
//                 this._cursor = i < this._array.length ? i + 1 : this._cursor;
//                 return value;
//             }
//         }
//     }
//
//     public hasNext(){
//         for (let i = this._cursor; i < this._array.length; i++) {
//             if(this._array[i+1]%this._divisor === 0){
//                 return true;
//             }
//         }
//         return false;
//     }
// }
//
// let consumer:IIterator = new Iterator([1,2,3,4,5,6,7,8,9,10],3);
// console.log(consumer.next(),consumer.hasNext());
// console.log(consumer.next(),consumer.hasNext());
// console.log(consumer.next(),consumer.hasNext());
// console.log(consumer.next(),consumer.hasNext());
// console.log(consumer.next(),consumer.hasNext());
// console.log(consumer.next(),consumer.hasNext());
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/observable/range';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/filter';

// let sequence:Observable<string> = Observable.create((observer:Observer<string>)=>{
//     observer.next('Hi');
//     observer.next('Angular2');
//     observer.complete();
// });
//
// let subscription:Subscription= sequence.subscribe((word:string):void=>console.log(word))


// let sequence: Observable<number> = Observable.range(1, 4);
// sequence.map(item => item ** 2)
//     .filter(item => item % 2 === 0)
//     .subscribe(item => console.log(item));

// import {Subject} from 'rxjs/Subject'
//
// let sequence = new Subject();
//
// sequence.subscribe(item=>console.log(item))
//
// setTimeout(()=>sequence.next('Angular2'),3000);


// import {Observable} from 'rxjs/Observable';
// import {Observer} from 'rxjs/Observer';
// import {AsyncSubject} from 'rxjs/AsyncSubject';
// import 'rxjs/add/observable/range'
//
// function getValue():Observable<number>{
//     let asyncSubject;
//     return Observable.create((observer:Observer<number>)=>{
//         if(!asyncSubject){
//             let delayRange = Observable.range(0,7);
//             asyncSubject = new AsyncSubject();
//             delayRange.subscribe(asyncSubject)
//         }
//         return asyncSubject.subscribe(observer);
//     })
// }
// let cachedValue= getValue();
//
// console.time('first result');
// cachedValue.subscribe(item => {
//     console.timeEnd('first result')
//     console.log('first value',item)
// })
//
// console.time('cached result');
// cachedValue.subscribe(item => {
//     console.timeEnd('cached result')
//     console.log('second value',item)
// })


// import {Observable} from 'rxjs/Observable';
// import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// import 'rxjs/add/observable/range'
//
// let behaviorSubject: BehaviorSubject<string|number> = new BehaviorSubject('Init value')
//
//
// behaviorSubject.subscribe(item=>console.log(item));
//
// Observable.range(0,5).subscribe(behaviorSubject)

// import {ReplaySubject} from 'rxjs/ReplaySubject';
// import 'rxjs/add/observable/range';
// import 'rxjs/add/operator/delay';
//
// let replaySubject: ReplaySubject<any> = new ReplaySubject(null,40);
// setTimeout(()=> replaySubject.next(1),100);
// setTimeout(()=> replaySubject.next(2),200);
// setTimeout(()=> replaySubject.next(3),300);
// setTimeout(()=> replaySubject.next(4),400);
// setTimeout(()=> replaySubject.subscribe(item=>console.log(item)),350);


