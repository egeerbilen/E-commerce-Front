import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalHelperComponent } from '../modal-helper.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState = new BehaviorSubject<any>({ isOpen: false, title: '', content: '' });
  modalState$ = this.modalState.asObservable();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  private createModalComponent(): ModalHelperComponent {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalHelperComponent);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    return componentRef.instance;
  }

  openModal(title: string, content: string) {
    const modalComponent = this.createModalComponent();
    this.modalState.next({ isOpen: true, title, content });
    modalComponent.isOpen = true;
    modalComponent.title = title;
    modalComponent.content = content;
  }

  closeModal() {
    this.modalState.next({ isOpen: false, title: '', content: '' });
  }
}
