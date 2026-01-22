FROM node:20-bullseye-slim

WORKDIR /app

# Copy package manifest first for Docker layer caching
COPY package.json package-lock.json* ./

# Install dependencies (ci if lockfile exists, otherwise install)
RUN if [ -f package-lock.json ]; then npm ci --no-audit --silent; else npm install --no-audit --silent; fi

# Copy project files
COPY . .

ENV PORT=3000
EXPOSE 3000

# Default: build and preview (bind to 0.0.0.0 so host can access)
CMD ["sh", "-c", "npm run build && npm run preview -- --host 0.0.0.0 --port $PORT"]
