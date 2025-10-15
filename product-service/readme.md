# Product Service

Backend service to fetch and store WooCommerce products in MongoDB. Includes periodic ingestion via cron.

## Environment Variables
Create a `.env` file with the following:

PORT=4000
MONGODB_URI=<your_mongo_uri>
WC_BASE_URL=<your_woocommerce_url>
WC_CONSUMER_KEY=<your_wc_consumer_key>
WC_CONSUMER_SECRET=<your_wc_consumer_secret>
CRON_SCHEDULE="0 */12 * * *"


Running Locally
npm run dev

Features

Fetch WooCommerce products

Upsert products into MongoDB

Cron-based ingestion every 12 hours

REST APIs:

GET /api/products → list products

POST /api/products/ingest → manual ingestion

GET /api/products/test-fetch → test Woo fetch