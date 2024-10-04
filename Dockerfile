# Base stage, shared across other stages
FROM node:18-alpine AS base
# Install necessary packages including eudev-dev
RUN apk add --no-cache g++ make py3-pip libc6-compat linux-headers eudev-dev
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

# Build stage
FROM base AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage
FROM base AS production
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Install only production dependencies
RUN npm ci --only=production

# Create a non-root user for security reasons
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Copy built files and production dependencies from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Start the application
CMD ["npm", "start"]

# Development stage
FROM base AS dev
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]