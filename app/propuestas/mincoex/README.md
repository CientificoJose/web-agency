# Proyecto MINCOEX | Next.js + Ghost

Portal oficial del **Ministerio del Poder Popular de Comercio Exterior (MINCOEX)** de la República Bolivariana de Venezuela. El sitio combina un frontend en `Next.js` con un CMS headless `Ghost` para gestionar noticias, páginas y multimedia.

## Arquitectura

- **Frontend** `Next.js 15` + `React 19` + `TypeScript`.
- **Estilos** con `Tailwind CSS` y componentes de `shadcn/ui`.
- **CMS** `Ghost` (Content API). Los exports de contenido (`.json`) viven en `cotenido_ghost/`.
- **Build** estático (`next export`) con `output: standalone` para despliegues en Docker o hosting estático.

## Requisitos previos

- Node.js 18.18+ (o la versión recomendada por Ghost CLI).
- Gestor de paquetes `pnpm` (`npm install -g pnpm`).
- Acceso a una instancia de Ghost 6.x (local, Docker o gestionada) con permisos de administrador.
- Variables de entorno para la Content API de Ghost.

## 1. Preparar Ghost

### 1.1 Instalación con Ghost-CLI (Linux)

```bash
sudo npm install -g ghost-cli
mkdir -p /var/www/mincoex-ghost
cd /var/www/mincoex-ghost
ghost install
```

Durante el asistente define URL, correo y credenciales. Asegura que la publicación quede accesible en `https://TU-DOMINIO/ghost`.

### 1.2 Instalación con Docker Compose

```yaml
services:
  ghost:
    image: ghost:6
    ports:
      - "2368:2368"
    environment:
      url: https://TU-DOMINIO
    volumes:
      - ./content:/var/lib/ghost/content
```

Levanta el stack con `docker compose up -d` y accede al panel para crear el usuario administrador.

### 1.3 Importar contenido existente

1. En el panel ve a `Settings → Advanced → Import/Export`.
2. Usa la opción **Import content** y selecciona alguno de los archivos `.json` ubicados en `cotenido_ghost/` (ej. `ministerio-del-comercio-exterior.ghost...json`).
3. Sigue las instrucciones para copiar la carpeta `content/images/` desde el Ghost origen al destino (consulta `cotenido_ghost/README.md` para detalles por sistema operativo).

Tras importar, verifica que los posts, páginas y etiquetas carguen correctamente y que las imágenes apunten a `/content/images/...`.

## 2. Configurar el frontend Next.js

### 2.1 Clonar e instalar dependencias

```bash
git clone https://github.com/tu-organizacion/mincoex-website.git
cd mincoex-website
pnpm install
```

### 2.2 Variables de entorno

Crea `.env.local` en la raíz:

```bash
GHOST_API_URL="https://tu-dominio"
GHOST_API_KEY="tu_content_api_key"
```

La clave se obtiene en Ghost: `Settings → Integrations → Add custom integration`.

### 2.3 Ejecutar en desarrollo

```bash
pnpm dev
```

El sitio queda disponible en `http://localhost:3000` consumiendo la Content API configurada.

## 3. Scripts disponibles

- `pnpm dev` inicia el servidor de desarrollo.
- `pnpm build` ejecuta `next build` (se ignoran errores de ESLint/TypeScript en build).
- `pnpm export` genera la versión estática en `out/` y copia `.htaccess`.
- `pnpm start` levanta `next start` (requiere build previo).

## 4. Notas de despliegue

- El modo export produce archivos estáticos en `out/`; sube el directorio a tu hosting preferido.
- Para despliegues con Docker, aprovecha `output: 'standalone'` y la carpeta `.next/standalone`.
- Asegura que el hosting permita servir imágenes del dominio configurado en `GHOST_API_URL`; `next.config.mjs` ya incluye `images.remotePatterns` dinámicos.

## 5. Estructura relevante

- `app/` rutas y páginas.
- `components/` UI reutilizable.
- `lib/ghost.ts` cliente Ghost y utilidades.
- `public/data/` y `public/api/` recursos estáticos.
- `cotenido_ghost/` exports de contenido y guía completa de migración.

## 6. Recursos adicionales

- Documentación Ghost: https://ghost.org/docs/
- Documentación Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs

Siguiendo esta guía tendrás Ghost listo con el contenido del ministerio y el frontend React conectado al CMS.

## 7. Proxy inverso en cPanel (`context/`)

En el hosting compartido de `mincoex.gob.ve` no es posible instalar `Ghost` ni ejecutar `Node.js`. La solución es apuntar el dominio a un VPS donde vive todo el stack y usar cPanel como proxy HTTP.

### 7.1 Flujo general

1. El visitante solicita `https://mincoex.gob.ve/...`.
2. `mod_rewrite` (configurado en `context/htaccess`) envía esa solicitud a `proxy.php`.
3. `context/proxy.php` reenvía la petición al upstream `https://mincoex.press-cloud.com`, respeta método y cuerpo, y devuelve la respuesta tal cual al cliente original.

### 7.2 Archivo `.htaccess`

- **Evita sobreescritura de recursos locales**: líneas `RewriteCond` comprueban si existe archivo/directorio (ej. `robots.txt`, `.well-known`, assets manuales) y los sirven directamente.
- **Protege contra bucles**: se bloquea el reenvío de `proxy.php` hacia sí mismo (`RewriteCond %{REQUEST_URI} !^/proxy\.php$`).
- **Forza `DirectoryIndex`**: si el usuario visita `/` sin ruta específica, cPanel carga `proxy.php` automáticamente.
- **Cache/compresión opcional**: reglas `mod_expires` y `mod_deflate` sólo aplican si decides guardar archivos locales.

Si cambias el nombre del script o necesitas excluir rutas adicionales (por ejemplo `/landing` con HTML estático), agrega reglas `RewriteCond` antes de la última `RewriteRule`.

### 7.3 Script `proxy.php`

- **Variables principales**: ajusta `$upstream` (URL del VPS con Next.js) y `$publicHost` (dominio público). El script usa `curl` para replicar la petición.
- **Encabezados reenviados**: filtra `Host`, `Content-Length` y `Accept-Encoding` para evitar conflictos; luego define `Host` del upstream y fuerza `Accept-Encoding: identity` para poder manipular o depurar la respuesta si es necesario.
- **Métodos con cuerpo**: lee `php://input` y lo pasa a `curl`, permitiendo manejar formularios (`POST`) y endpoints (`PUT`, `PATCH`, `DELETE`).
- **Encabezados `X-Forwarded-*`**: preservan IP y protocolo originales, útiles para registros y lógica en el VPS.
- **Redirecciones**: `CURLOPT_FOLLOWLOCATION` está desactivado para que la respuesta original (incluyendo encabezado `Location`) llegue intacta al cliente final.

Si el upstream cambia, actualiza `$upstream` o incorpora lógica para seleccionar el destino según subdominio/path. Para diagnosticar problemas, puedes activar logging simple agregando `error_log()` en puntos clave o revisar los registros de errores de cPanel.

### 7.4 Despliegue en cPanel

- Sube los archivos de `context/` a la raíz pública del dominio (`public_html/` o equivalente).
- Verifica que la versión de PHP asignada soporte `curl` (en `proxy.php` es requerido).
- Habilita SSL en cPanel para que el proxy reciba solicitudes HTTPS y las reenvíe como HTTPS al VPS.
- Prueba rutas críticas (`/`, `/noticias`, `/api/...`) y confirma que encabezados como `X-Forwarded-Proto` llegan al servidor destino.

Con este esquema el visitante navega `mincoex.gob.ve` como si el contenido residiera en cPanel, mientras todo se sirve realmente desde el VPS administrado.
