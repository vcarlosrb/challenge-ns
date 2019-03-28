import { Component, OnInit } from "@angular/core";
import * as firebase from 'nativescript-plugin-firebase';
import { RouterExtensions } from "nativescript-angular/router";
import * as appSettings from 'tns-core-modules/application-settings';
import { LoadingIndicator } from 'nativescript-loading-indicator';

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    loader: LoadingIndicator;
    constructor(
        private routerExtensions: RouterExtensions
    ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.loader = new LoadingIndicator();
    }

    fbLogin() {
        this.loader.show({
            message: 'Cargando...'
        });
        firebase.login({
            type: firebase.LoginType.FACEBOOK,
            facebookOptions: {
                scope: ['public_profile', 'email']
            }
        }).then((result) => {
            let data = JSON.stringify(result.additionalUserInfo.profile);
            console.log("[*] Facebook Auth Success: " + data);
            appSettings.setString('userInfo', String(data));
            this.loader.hide();
            this.routerExtensions.navigate(["/form"], { clearHistory: true });
        },(errorMessage) => {
            console.log("[*] Facebook Auth Error: " + errorMessage);
        });
    }
}
