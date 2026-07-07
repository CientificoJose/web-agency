FROM node:20-alpine

WORKDIR /app

# Habilitar corepack para poder usar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml* ./

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
