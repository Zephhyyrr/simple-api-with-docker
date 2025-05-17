# Base image Node.js versi 20
FROM node:20

# Set working directory di dalam container ke /app
WORKDIR /app

# Salin file package.json dan package-lock.json untuk install deps
COPY package*.json ./

# Install dependencies npm
RUN npm install

# Salin seluruh source code ke container (termasuk prisma/schema.prisma)
COPY . .

# Ekspos port 3000 supaya bisa diakses dari luar container
EXPOSE 3000

# Jalankan perintah npm run dev saat container start (biasanya ts-node-dev)
CMD ["npm", "run", "dev"]