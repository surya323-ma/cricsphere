#!/bin/bash

echo "🏏 CricSphere - Setup Script"
echo "============================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker found${NC}"

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker Compose found${NC}"
echo ""

# Create .env files
echo "📝 Creating environment files..."

# Backend .env
cat > backend/.env << EOF
MONGODB_URI=mongodb://admin:password123@mongodb:27017/cricsphere?authSource=admin
JWT_SECRET=cricsphere-secret-key-2024
NODE_ENV=development
PORT=5000
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-password
STRIPE_PUBLIC_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
EOF

echo -e "${GREEN}✓ Backend .env created${NC}"

# Frontend .env
cat > frontend/.env << EOF
REACT_APP_API_URL=http://localhost:5000
REACT_APP_WS_URL=ws://localhost:5002
REACT_APP_ENV=development
EOF

echo -e "${GREEN}✓ Frontend .env created${NC}"

echo ""
echo -e "${YELLOW}📦 Building Docker images...${NC}"
docker-compose build

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "🚀 To start the project, run:"
echo -e "${YELLOW}  docker-compose up${NC}"
echo ""
echo "📱 Access the application:"
echo -e "  ${GREEN}Frontend: http://localhost:3000${NC}"
echo -e "  ${GREEN}Backend API: http://localhost:5000${NC}"
echo -e "  ${GREEN}Admin: http://localhost:3000/admin/login${NC}"
echo ""
echo "🔐 Default Admin Credentials:"
echo -e "  ${YELLOW}Email: admin@cricsphere.com${NC}"
echo -e "  ${YELLOW}Password: admin123${NC}"
echo ""
