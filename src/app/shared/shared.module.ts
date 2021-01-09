import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { AngularEmojisModule } from 'angular-emojis'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { KoaServicesModule, serverAddress, serverProtocol, SERVER_ADDRESS, SERVER_PROTOCOL } from 'koa-services'
import { UserPopoverPage } from './components/popover/user-popover/user-popover.page'
import { PasswordChangePopoverPage } from './components/popover/password-change-popover/password-change-popover.page'
import { ComponentsModule } from './components/components.module'

const SHARED_MODALS = [
    UserPopoverPage,
    PasswordChangePopoverPage,
]

const SHARED_ENTITIES = [
]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

const REACTIVE_FORM_DIRECTIVES = [                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    FormsModule,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    ReactiveFormsModule
]

const SHARED_MODULES = [                                                                                                                                                                                                                                                                                                
    KoaServicesModule,
    ComponentsModule,
    FontAwesomeModule,
    AngularEmojisModule,
    MatExpansionModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
]                                                                                                                                                                                                                               

const SHARED_IMPORTED_MODULES = []                                                                                                                      
const SHARED_PROVIDED_MODULES = [
    // MatIconRegistry,
    { provide: SERVER_ADDRESS,  useValue: serverAddress},
    { provide: SERVER_PROTOCOL, useValue: serverProtocol}
]

@NgModule({
    declarations: [
        ...SHARED_ENTITIES,
        ...SHARED_MODALS,
    ],
    imports: [
        CommonModule,
        IonicModule,
        ...REACTIVE_FORM_DIRECTIVES,
        ...SHARED_MODULES,
        ...SHARED_IMPORTED_MODULES,
    ],
    exports: [
        ...SHARED_ENTITIES,
        ...SHARED_MODULES,
    ],
    entryComponents: [
        ...SHARED_MODALS,
    ],
    providers: [
        ...SHARED_PROVIDED_MODULES,
    ],
    // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { 
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, far, fab);
    }
}

//   export class MaterialModule {
//       constructor(public matIconRegistry: MatIconRegistry) {
//       matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
//       }
//   }
