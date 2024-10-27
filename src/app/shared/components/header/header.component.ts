import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title: string;
  @Input() backButton: string;
  @Input() showMenu: boolean;
  @Input() color: string;
  @Input() isModal: boolean;
  @Input() centerTitle: boolean;

  constructor(private utilsSvc: UtilsService) {}

  closeModal() {
    if (this.isModal) {
      this.utilsSvc.dismissModal();  // Cerrar el modal
    }
  }

  ngOnInit() {}

}
