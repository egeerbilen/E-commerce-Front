import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  Output,
  Type,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ComponentFactoryResolver,
  OnInit
} from '@angular/core';
import { ModalService } from './service/modal-service.service';

@Component({
  selector: 'app-modal-helper',
  templateUrl: './modal-helper.component.html',
  styleUrls: ['./modal-helper.component.css']
})
export class ModalHelperComponent implements OnInit {
  isOpen = false;
  title: string = '';
  content: string = '';

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.modalState$.subscribe((state: any) => {
      this.isOpen = state.isOpen;
      this.title = state.title;
      this.content = state.content;
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
