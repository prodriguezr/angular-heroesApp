import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: false,

  templateUrl: './layout.component.html',
  styles: ``,
})
export class LayoutComponent {
  sidebarItems = [
    {
      label: 'Listado',
      icon: 'label',
      route: './list',
    },
    {
      label: 'Agregar',
      icon: 'add',
      route: './add',
    },
    {
      label: 'Buscar',
      icon: 'search',
      route: './search',
    },
  ];
}
