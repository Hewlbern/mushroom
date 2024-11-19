
# Configuration
API_URL="http://localhost:3000"
MUSHROOM_PAYMENT_TXID="a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"
RETURN_ADDRESS="ecash:qz2708636snqhsxu8wnlka78h6fdp77ar59jrf5035"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "Testing API Router..."

# Test 1: Search API
echo -e "\n${GREEN}Testing /search endpoint${NC}"
search_response=$(curl -s -X POST "${API_URL}/search" \
  -H "Content-Type: application/json" \
  -d "{
    \"mushroomPaymentTxid\": \"${MUSHROOM_PAYMENT_TXID}\",
    \"returnAddress\": \"${RETURN_ADDRESS}\",
    \"query\": \"test\"
  }")

echo "Search Response:"
echo $search_response | jq '.'

# Extract first API name from search results for route test
api_name=$(echo $search_response | jq -r '.apis[0].name // empty')

if [ ! -z "$api_name" ]; then
    # Test 2: Route API
    echo -e "\n${GREEN}Testing /route/${api_name} endpoint${NC}"
    route_response=$(curl -s -X POST "${API_URL}/route/${api_name}" \
      -H "Content-Type: application/json" \
      -d "{
        \"mushroomPaymentTxid\": \"${MUSHROOM_PAYMENT_TXID}\",
        \"returnAddress\": \"${RETURN_ADDRESS}\",
        \"request\": {
          \"test\": \"data\"
        }
      }")

    echo "Route Response:"
    echo $route_response | jq '.'
else
    echo -e "\n${RED}No APIs found in search results to test /route endpoint${NC}"
fi

# Test 3: Invalid Search (Missing Parameters)
echo -e "\n${GREEN}Testing /search with invalid parameters${NC}"
invalid_response=$(curl -s -X POST "${API_URL}/search" \
  -H "Content-Type: application/json" \
  -d "{
    \"query\": \"test\"
  }")

echo "Invalid Request Response:"
echo $invalid_response | jq '.'