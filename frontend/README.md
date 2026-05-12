# Frontend - Compliance Platform

Aplicación web frontend desarrollada en React para el sistema Compliance Platform. Incluye autenticación con JWT y páginas de login y bienvenida.

## Características

- **Autenticación JWT**: Sistema de login seguro con tokens
- **Rutas protegidas**: Acceso restringido a páginas que requieren autenticación
- **Diseño moderno**: Implementación del sistema de diseño definido en `DESIGN.md`
- **Gestión de sesión**: Almacenamiento seguro de tokens en sessionStorage
- **Interfaz responsive**: Adaptable a diferentes tamaños de pantalla

## Requisitos previos

- Node.js 18+ 
- npm o yarn
- Backend ejecutándose en `http://localhost:8000`

## Instalación

1. Navegar a la carpeta del frontend:
```bash
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

Editar `.env` si es necesario para cambiar la URL del backend:
```
VITE_API_URL=http://localhost:8000
```

## Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Compilar para producción

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`

Para previsualizar la compilación:
```bash
npm run preview
```

## Estructura del proyecto

```
frontend/
├── src/
│   ├── components/      # Componentes reutilizables
│   │   └── ProtectedRoute.jsx
│   ├── pages/          # Páginas de la aplicación
│   │   ├── Login.jsx
│   │   ├── Login.css
│   │   ├── Welcome.jsx
│   │   └── Welcome.css
│   ├── services/       # Servicios y APIs
│   │   └── api.js
│   ├── utils/          # Utilidades
│   │   └── auth.js
│   ├── App.jsx         # Componente principal
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
├── .env.example
├── package.json
└── README.md
```

## Uso de la aplicación

### Página de Login

1. Acceder a `http://localhost:5173`
2. Serás redirigido automáticamente a `/login`
3. Ingresar credenciales (por defecto: `admin` / `admin123`)
4. Al iniciar sesión exitosamente, serás redirigido a `/welcome`

### Página de Bienvenida

- Muestra información del usuario autenticado
- Incluye tarjetas informativas sobre la seguridad de la sesión
- Permite cerrar sesión mediante el botón "Cerrar sesión"
- Solo accesible si has iniciado sesión

### Rutas disponibles

- `/` - Redirige a `/login`
- `/login` - Página de inicio de sesión
- `/welcome` - Página de bienvenida (requiere autenticación)

## Tecnologías utilizadas

- **React 19**: Framework de UI
- **Vite**: Build tool y servidor de desarrollo
- **React Router DOM**: Gestión de rutas
- **Axios**: Cliente HTTP para llamadas a la API
- **CSS3**: Estilos personalizados siguiendo el sistema de diseño

## Sistema de diseño

La aplicación implementa el sistema de diseño definido en `DESIGN.md`:

- **Colores**: Paleta basada en #0F172A (primario) y #FAFAFA (background)
- **Tipografía**: Familia de fuentes Inter
- **Componentes**: Efecto glass, sombras sutiles, bordes degradados
- **Espaciado**: Sistema de 12px como base
- **Bordes redondeados**: 4px, 15px, 16px, 24px

## Credenciales de acceso

Por defecto (configurables en el backend):
- **Usuario**: `admin`
- **Contraseña**: `admin123`

## Solución de problemas

### El login no funciona

1. Verificar que el backend esté ejecutándose en `http://localhost:8000`
2. Comprobar la configuración de CORS en el backend
3. Verificar las credenciales de acceso

### Error de CORS

Asegurarse de que el backend tenga configurado CORS para permitir solicitudes desde `http://localhost:5173`

### La aplicación no carga

1. Verificar que las dependencias estén instaladas: `npm install`
2. Comprobar que el puerto 5173 no esté en uso
3. Revisar la consola del navegador para errores

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm run preview` - Previsualiza la compilación de producción
- `npm run lint` - Ejecuta el linter de código

## Licencia

Este proyecto está bajo la licencia Apache 2.0 (ver archivo LICENSE en la raíz del proyecto).

