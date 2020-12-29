import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { KoaServicesModule, serverAddress, serverProtocol, SERVER_ADDRESS, SERVER_PROTOCOL } from 'koa-services'
import { UserPopoverPage } from './components/popover/user-popover/user-popover.page'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { ComponentsModule } from './components/components.module'
// import { TabHeaderComponent } from './components/directive/tab-header/tab-header.component'
// import { TabFooterComponent } from './components/directive/tab-footer/tab-footer.component'                                                                                                 

const SHARED_MODALS = [
    UserPopoverPage,
]

const SHARED_ENTITIES = [
    // TabHeaderComponent,
    // TabFooterComponent,
]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

const REACTIVE_FORM_DIRECTIVES = [                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    FormsModule,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    ReactiveFormsModule
]

const SHARED_MODULES = [                                                                                                                                                                                                                                                                                                
    KoaServicesModule,
    ComponentsModule,
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
export class SharedModule { }

//   export class MaterialModule {
//       constructor(public matIconRegistry: MatIconRegistry) {
//       matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
//       }
//   }
