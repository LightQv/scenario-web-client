FROM node:22-alpine AS builder

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S scenario -u 1001

# Set working directory
WORKDIR /home/scenario/app

# Change ownership to user
RUN chown -R scenario:nodejs /home/scenario/app

# Copy package configuration files
COPY --chown=scenario:nodejs package*.json ./

# Change ownership to user
USER scenario

# Install dependencies
RUN npm install

# Copy application code
COPY --chown=scenario:nodejs . .

# Expose the application port
EXPOSE 5173

# Default command for development
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]