import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'noauth',
        pathMatch: 'full'
      },
      {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
          {
            path: 'gallery',
            loadComponent: () => import('./business/home/components/gallery/gallery.component'),
          },
          {
            path: 'noauth',
            loadComponent: () => import('./business/home/components/no-auth/no-auth.component'),
          },
          {
            path: 'file',
            loadComponent: () => import('./business/users/components/file-upload/file-upload.component'),
          },
          {
            path: 'layout-usuarios',
            loadComponent: () => import('./business/gestionar-usuarios/components/layout-usuarios/layout-usuarios.component')
          },
          {
            path: 'filesel',
            loadComponent: () => import('./business/users/components/select-file/select-file.component')
          },
          {
            path: 'newusuario',
            loadComponent: () => import('./business/gestionar-usuarios/components/new-usuario/new-usuario.component')
          },
          {
            path: 'gareas',
            loadComponent: () => import('./business/gestionar-areas/components/layout-areas/layout-areas.component')
          },
          {
            path: 'geditoriales',
            loadComponent: () => import('./business/gestionar-editoriales/components/layout-editoriales/layout-editoriales.component')
          },
          {
            path: 'gtipos',
            loadComponent: () => import('./business/gestionar-tipos/components/layout-tipos/layout-tipos.component')
          },
          {
            path: 'gautores',
            loadComponent: () => import('./business/gestionar-autores/components/layout-autores/layout-autores.component')
          },
          {
            path: 'gtextos',
            loadComponent: () => import('./business/gestionar-textos/components/layout-textos/layout-textos.component')
          },
          {
            path: 'gmenus',
            loadComponent: () => import('./business/gestionar-menus/components/layout-menus/layout-menus.component')
          },
          {
            path: 'groles',
            loadComponent: () => import('./business/gestionar-roles/components/layout-roles/layout-roles.component')
          },
          {
            path: 'gprocesostomenus',
            loadComponent: () => import('./business/add-procesos-to-menu/components/layout-proc-men/layout-proc-men.component')
          },
          {
            path: 'gmenustoroles',
            loadComponent: () => import('./business/add-menus-to-rol/components/layou-menu-rol/layou-menu-rol.component')
          },
          {
            path: 'groluser',
            loadComponent: () => import('./business/add-roles-to-user/components/layout-rol-user/layout-rol-user.component')
          }
        ]
      },
      // Comodín, se debe asegurar que está al final
      {
        path: '**',
        redirectTo: 'noauth'
      }
];
