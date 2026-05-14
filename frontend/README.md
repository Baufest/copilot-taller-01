# Compliance Platform — Frontend

Aplicación web Angular que provee autenticación JWT integrada con el backend FastAPI.

## Características

- **Página de login** con validación de formulario y manejo de errores
- **Página de bienvenida** protegida por un `authGuard`
- Token JWT almacenado en `sessionStorage` (expira al cerrar el navegador)
- Redirección automática al login si no hay sesión activa
- Diseño basado en el sistema de diseño definido en `DESIGN.md` (Compliance Platform)

## Tecnologías

- [Angular 20](https://angular.dev) (standalone components, signals, reactive forms)
- SCSS para estilos
- `HttpClient` para comunicación con el backend
- `CanActivateFn` guard para proteger rutas

## Estructura del proyecto

```
frontend/
├── src/
│   ├── app/
│   │   ├── guards/
│   │   │   └── auth.guard.ts          # Protege la ruta /welcome
│   │   ├── pages/
│   │   │   ├── login/
│   │   │   │   ├── login.component.ts
│   │   │   │   ├── login.component.html
│   │   │   │   └── login.component.scss
│   │   │   └── welcome/
│   │   │       ├── welcome.component.ts
│   │   │       ├── welcome.component.html
│   │   │       └── welcome.component.scss
│   │   ├── services/
│   │   │   └── auth.service.ts        # Login, logout, getToken, isLoggedIn
│   │   ├── app.config.ts              # provideRouter + provideHttpClient
│   │   ├── app.routes.ts              # Rutas de la aplicación
│   │   └── app.ts                     # Componente raíz
│   ├── environments/
│   │   ├── environment.ts             # URL del backend (desarrollo)
│   │   └── environment.prod.ts        # URL del backend (producción)
│   ├── index.html
│   └── styles.scss                    # Estilos globales
├── angular.json
└── package.json
```

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior
- Backend corriendo en `http://localhost:8000` (ver `backend/README.md`)

## Instalación

```bash
cd frontend
npm install
```

## Ejecución en desarrollo

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`.

> **Nota:** Asegúrate de que el backend esté corriendo antes de intentar iniciar sesión.

## Build de producción

```bash
npm run build
```

Los archivos de salida se generarán en `dist/frontend/`.

## Configuración de la URL del backend

Por defecto, el frontend apunta a `http://localhost:8000`. Para cambiar la URL:

- **Desarrollo:** edita `src/environments/environment.ts`
- **Producción:** edita `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://tu-backend-url:8000'
};
```

## Flujo de la aplicación

```
/ → /login
        │
        ├─ Credenciales incorrectas → Mensaje de error en pantalla
        │
        └─ Credenciales correctas → POST /token → Guarda JWT en sessionStorage
                                                        │
                                                        └─ Redirige a /welcome
                                                                    │
                                                                    └─ Logout → /login
```

### Rutas

| Ruta       | Componente         | Guard       | Descripción                              |
|------------|-------------------|-------------|------------------------------------------|
| `/`        | —                 | —           | Redirige a `/login`                      |
| `/login`   | `LoginComponent`  | —           | Página de inicio de sesión               |
| `/welcome` | `WelcomeComponent`| `authGuard` | Página de bienvenida (requiere sesión)   |
| `/**`      | —                 | —           | Redirige a `/login`                      |

## Credenciales por defecto

El backend usa por defecto:

| Campo    | Valor      |
|----------|------------|
| Usuario  | `admin`    |
| Contraseña | `admin123` |

Estos valores pueden configurarse en el backend mediante variables de entorno (`ADMIN_USERNAME`, `ADMIN_PASSWORD`).

## Sistema de diseño

El frontend implementa el sistema de diseño especificado en `DESIGN.md`:

- **Colores:** primario `#0F172A`, secundario `#E0E7FF`, fondo `#FAFAFA`
- **Tipografía:** Inter (400, 500, 600)
- **Superficies:** estilo glass con `backdrop-filter: blur(12px)` y degradado
- **Bordes:** radio de 4px, 15px, 16px según el componente
- **Espaciado:** ritmo base de 12px
