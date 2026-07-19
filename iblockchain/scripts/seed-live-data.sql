-- Seed deposit wallets matching live site
INSERT INTO public.deposit_wallets (crypto_name, crypto_symbol, wallet_address, network, is_active) VALUES
('BITCOIN', 'BTC', 'bc1qjfekp8625kzqurq278ukmjc7dqc4zf8s762w6q', 'BTC', true),
('TRON', 'TRX', 'TEDNsqH8bydCdPJUAS3NgNpJZfVJCcnDd3', 'TRON', true),
('SOLANA', 'SOL', 'D4JVjfqrrbVVbsjMZXFX82hFc3EpmKmmJwWeFeoqyRrP', 'SOLANA', true),
('XRP', 'XRP', 'rM9MtcoLxwYBqXFMaB8eA7ytXuE2fNEyh5', 'XRP', true),
('LTC', 'LTC', 'ltc1q80zsx6crwa7rh4zjptt9jaqctshgkemr3clc3y', 'LTC', true),
('TON', 'TON', 'UQCrTx5rZptGDoqs8bl2eil4DrNrE8ZiIamlZiMbQwrJpIYP', 'TON', true),
('USDC', 'USDC', '0x73840bB3CDb4f7962CE3AC1AfEB86A183630cC41', 'ERC20', true),
('BNB', 'BNB', '0x73840bB3CDb4f7962CE3AC1AfEB86A183630cC41', 'BNB20', true),
('USDT', 'USDT', '0x5dbd0eb6a0cbb57cfada342231797b4c5d9b229d', 'ERC20', true),
('ETHEREUM', 'ETH', '0x5dbd0eb6a0cbb57cfada342231797b4c5d9b229d', 'ETHEREUM', true)
ON CONFLICT DO NOTHING;

-- Seed market payment wallets matching live site
INSERT INTO public.market_payment_wallets (crypto_symbol, network, wallet_address, instructions, is_active) VALUES
('USDT', 'TRC20', 'TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'Send USDT using TRC20 only and submit the transaction hash.', true),
('USDT', 'ERC20', '0x0000000000000000000000000000000000000000', 'Send USDT using ERC20 only and submit the transaction hash.', true),
('BTC', 'Bitcoin', 'bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'Send BTC to this wallet and submit the transaction hash.', true)
ON CONFLICT DO NOTHING;

-- Seed market assets matching live site (24 assets)
INSERT INTO public.market_assets (name, symbol, category, description, current_price, profit_rate, min_trade_amount, is_active, terms) VALUES
('Recovery Growth Plan', 'RGP', 'plan', 'Managed recovery growth plan with admin-controlled client profits.', 500, 8, 100, true, 'Plan activation and profits remain subject to account status.'),
('Forensic Wallet Report', 'FWR', 'service', 'Transaction tracing and wallet investigation service.', 180, 0, 50, true, 'Service orders are fulfilled after admin review.'),
('Brent Oil', 'BRENT', 'energy', 'Trade Brent oil exposure through the platform marketplace.', 86, 7, 100, true, 'Subject to platform market terms and admin review where applicable.'),
('Silver Spot', 'XAG', 'metal', 'Trade silver as a market asset available for buying, selling, and exchange under platform terms.', 76.316, 6, 50, true, 'Subject to platform market terms and admin review where applicable.'),
('Soybeans', 'SOY', 'commodity', 'Trade soybeans commodity exposure through the platform marketplace.', 1177.5, 4, 50, true, 'Subject to platform market terms and admin review where applicable.'),
('Gold Spot', 'XAU', 'metal', 'Trade gold as a market asset available for buying, selling, and exchange under platform terms.', 4527, 8, 100, true, 'Subject to platform market terms and admin review where applicable.'),
('Platinum Spot', 'XPT', 'metal', 'Trade platinum as a market asset available for buying, selling, and exchange.', 1955.78, 6, 100, true, 'Subject to platform market terms and admin review where applicable.'),
('EUR / USD', 'EURUSD', 'forex', 'Trade EUR/USD forex pair through the platform marketplace.', 1.16501, 3, 50, true, 'Subject to platform market terms and admin review where applicable.'),
('NVIDIA Corp.', 'NVDA', 'stock', 'Trade NVIDIA stock exposure through the platform marketplace.', 224.36, 8, 100, true, 'Subject to platform market terms and admin review where applicable.'),
('Tether USD', 'USDT', 'crypto', 'Stable digital balance bundle for platform operations.', 0.999348, 1.2, 20, true, 'Stablecoin purchases can be funded from balance or external transfer.'),
('Tesla Inc.', 'TSLA', 'stock', 'Trade Tesla stock exposure through the platform marketplace.', 415.88, 7, 100, true, 'Subject to platform market terms and admin review where applicable.'),
('GBP / USD', 'GBPUSD', 'forex', 'Trade GBP/USD forex pair through the platform marketplace.', 1.34717, 3, 50, true, 'Subject to platform market terms and admin review where applicable.'),
('Ethereum', 'ETH', 'crypto', 'Ethereum market access with buy, sell, and trade options.', 1843.15, 3.8, 40, true, 'Prices may update based on market conditions.'),
('Crude Oil', 'OIL', 'energy', 'Trade crude oil exposure through the platform marketplace.', 91.08, 7, 100, true, 'Subject to platform market terms and admin review where applicable.'),
('Natural Gas', 'GAS', 'energy', 'Trade natural gas exposure through the platform marketplace.', 3.21, 5, 50, true, 'Subject to platform market terms and admin review where applicable.'),
('Wheat', 'WHEAT', 'commodity', 'Trade wheat commodity exposure through the platform marketplace.', 604.12, 4, 50, true, 'Subject to platform market terms and admin review where applicable.'),
('Bitcoin', 'BTC', 'crypto', 'Secure Bitcoin trading from platform balance or external crypto payment.', 63947.09, 4.5, 50, true, 'Trading is subject to platform review and market availability.'),
('USD / JPY', 'USDJPY', 'forex', 'Trade USD/JPY forex pair through the platform marketplace.', 159.7325, 3, 50, true, 'Subject to platform market terms and admin review where applicable.'),
('Copper', 'COPPER', 'commodity', 'Trade copper commodity exposure through the platform marketplace.', 663.63, 5, 50, true, 'Subject to platform market terms and admin review where applicable.'),
('Apple Inc.', 'AAPL', 'stock', 'Trade Apple stock exposure through the platform marketplace.', 306.31, 5, 100, true, 'Subject to platform market terms and admin review where applicable.'),
('S&P 500 Index', 'SPX', 'stock', 'Trade S&P 500 index exposure through the platform marketplace.', 7600, 4, 100, true, 'Subject to platform market terms and admin review where applicable.'),
('Corn', 'CORN', 'commodity', 'Trade corn commodity exposure through the platform marketplace.', 442.62, 4, 50, true, 'Subject to platform market terms and admin review where applicable.'),
('Coffee', 'COFFEE', 'commodity', 'Trade coffee commodity exposure through the platform marketplace.', 261.75, 4, 50, true, 'Subject to platform market terms and admin review where applicable.')
ON CONFLICT DO NOTHING;
