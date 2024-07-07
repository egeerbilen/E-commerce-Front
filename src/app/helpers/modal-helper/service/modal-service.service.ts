import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ModalHelperComponent } from '../modal-helper.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _modalState = new BehaviorSubject<any>({ isOpen: false, title: '', content: '' });
  modalState$ = this._modalState.asObservable();

  /**
   * Constructor.
   * @param _componentFactoryResolver ComponentFactoryResolver.
   * @param _appRef AppRef.
   * @param _injector Injector.
   */
  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector
  ) {}

  /**
   * CreateModalComponent.
   * @returns ModalHelperComponent.
   */
  private _createModalComponent(): ModalHelperComponent {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(ModalHelperComponent);
    const componentRef = componentFactory.create(this._injector);
    this._appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    return componentRef.instance;
  }

  /**
   * OpenModal.
   * @param title Title.
   * @param content Content.
   */
  public openModal(title: string, content: string): void {
    const modalComponent = this._createModalComponent();
    this._modalState.next({ isOpen: true, title, content });
    modalComponent.isOpen = true;
    modalComponent.title = title;
    modalComponent.content = content;
  }

  /**
   * CloseModal.
   */
  public closeModal(): void {
    this._modalState.next({ isOpen: false, title: '', content: '' });
  }
}
