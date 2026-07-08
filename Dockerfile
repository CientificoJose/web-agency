FROM node:22-alpine

WORKDIR /app

# Habilitar corepack y fijar pnpm a la versión 10 (compatible con .npmrc)
RUN corepack enable && corepack prepare pnpm@10 --activate

# Copiar archivos de dependencias e indicación de scripts permitidos (.npmrc)
COPY package.json pnpm-lock.yaml* .npmrc* ./

# Instalar dependencias
RUN pnpm install

# Copiar el código del proyecto
COPY . .

# Desactivar telemetría de Next.js durante la compilación
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Compilar la aplicación Next.js
RUN pnpm run build

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["pnpm", "start"]
