import { Component, OnInit } from "@angular/core";
import * as firebase from 'nativescript-plugin-firebase';

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    ngOnInit() {
        firebase.init({}).then((instance) => {
            console.log("[*] Firebase was successfully initialised");
        }, (error) => {
            console.log("[*] Huston we've an initialization error: " + error);
        });
    }
 }
