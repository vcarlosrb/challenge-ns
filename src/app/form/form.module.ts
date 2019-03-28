import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { FormRoutingModule } from "./form-routing.module";
import { FormComponent } from "./form.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        FormRoutingModule
    ],
    declarations: [
        FormComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FormModule { }
