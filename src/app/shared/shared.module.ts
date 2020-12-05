import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { KoaServicesModule, serverAddress, serverProtocol, SERVER_ADDRESS, SERVER_PROTOCOL } from 'koa-services'

const SHARED_MODALS = [
]

const SHARED_ENTITIES = [
]

const REACTIVE_FORM_DIRECTIVES = [
]

const SHARED_MODULES = [
    KoaServicesModule,
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
    ]
})
export class SharedModule { }

//   export class MaterialModule {
//       constructor(public matIconRegistry: MatIconRegistry) {
//       matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
//       }
//   }
