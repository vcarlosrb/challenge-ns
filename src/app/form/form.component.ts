import { Component, OnInit } from "@angular/core";
import { Page } from 'tns-core-modules/ui/page';
import * as firebase from 'nativescript-plugin-firebase';
import * as appSettings from 'tns-core-modules/application-settings';
import { TextField } from 'tns-core-modules/ui/text-field'
import { DatePicker } from 'tns-core-modules/ui/date-picker'
import * as Dialog from 'tns-core-modules/ui/dialogs';
import { LoadingIndicator } from 'nativescript-loading-indicator';

@Component({
    selector: "Form",
    moduleId: module.id,
    templateUrl: "./form.component.html"
})
export class FormComponent implements OnInit {
    userData: Map<string, any>;
    loader: LoadingIndicator;

    private _firstNameTextField: TextField;
    private _lastNameTextField: TextField;
    private _ageTextField: TextField;
    private _datePicker: DatePicker;

    constructor(
        private page: Page
    ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.userData = JSON.parse(JSON.stringify(appSettings.getString('userInfo')));
        this.loader = new LoadingIndicator();

        this._firstNameTextField = <TextField>this.page.getViewById('firstNameTextField');
        this._lastNameTextField = <TextField>this.page.getViewById('lastNameTextField');
        this._ageTextField = <TextField>this.page.getViewById('ageTextField');
        this._datePicker = <DatePicker>this.page.getViewById('datePicker');
    }

    addToMyBucket() {
        this.loader.show({
            message: 'Guardando Informacion...'
        });
        firebase.push('/users', {
            first_name: this._firstNameTextField.text,
            last_name: this._lastNameTextField.text,
            age: this._ageTextField.text,
            birthdate: this._datePicker.date,
        }).then((result) => {
            console.log("[*] Info : Your data was pushed !");
            this.loader.hide();
            Dialog.alert({
                title: "Exito!",
                message: "Su informacion ha sido almacenado!",
                okButtonText: "Aceptar"
            });
        }, (error) => {
            console.log("[*] Error : While pushing your data to Firebase, with error: " + error);
        });
    }
}
