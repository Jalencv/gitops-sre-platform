# app/Dockerfile
 
# Use official Node slim image — smaller attack surface
FROM node:20-slim
 
# Don't run as root — security best practice
RUN groupadd -r appuser && useradd -r -g appuser appuser
 
WORKDIR /app
 
# Copy package files first so Docker caches the npm install layer
COPY app/package*.json ./
RUN npm install --production
 
# Copy application code
COPY app/server.js .
 
# Switch to non-root user
USER appuser
 
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O- http://localhost:3000/health || exit 1
CMD ["node", "server.js"]
