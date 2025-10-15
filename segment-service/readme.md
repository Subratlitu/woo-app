# Segment Service

Backend service to evaluate product segments based on rules.

## Environment Variables
Create a `.env` file with the following:

PORT=5000
MONGODB_URI=<your_mongo_uri>
WC_BASE_URL=<your_woocommerce_url>
WC_CONSUMER_KEY=<your_wc_consumer_key>
WC_CONSUMER_SECRET=<your_wc_consumer_secret>


## Installation

```bash
npm install

Running Locally
npm run dev

Features

Evaluate product segments based on rules (price, on_sale, stock_status, etc.)

REST APIs for evaluation