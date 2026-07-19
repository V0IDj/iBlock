-- Seed market assets
INSERT INTO public.market_assets (name, symbol, category, description, current_price, profit_rate, min_trade_amount, is_active, terms) VALUES
('Bitcoin', 'BTC', 'crypto', 'Bitcoin is the world''s first decentralized cryptocurrency.', 64250, 1.5, 50, true, 'Min 24h holding period. Settlement T+1.'),
('Ethereum', 'ETH', 'crypto', 'Ethereum is a decentralized open-source blockchain.', 1845, 2.1, 50, true, 'Min 24h holding period. Settlement T+1.'),
('Tether', 'USDT', 'crypto', 'Tether is a stablecoin pegged to the US Dollar.', 0.999, 0.1, 50, true, 'Instant settlement. No holding period.'),
('Solana', 'SOL', 'crypto', 'Solana is a high-performance blockchain platform.', 75.3, 3.2, 50, true, 'Min 24h holding period. Settlement T+1.'),
('BNB', 'BNB', 'crypto', 'BNB is the native token of the Binance ecosystem.', 570, 1.8, 50, true, 'Min 24h holding period.'),
('XRP', 'XRP', 'crypto', 'XRP is the native cryptocurrency of the XRP Ledger.', 1.09, 0.9, 50, true, 'Min 24h holding period.'),
('Gold (XAU/USD)', 'XAU', 'metal', 'Spot Gold vs US Dollar — international benchmark.', 2335.50, 2.5, 100, true, 'Settlement T+2. Storage fees may apply.'),
('Silver (XAG/USD)', 'XAG', 'metal', 'Spot Silver vs US Dollar.', 29.45, 1.8, 100, true, 'Settlement T+2.'),
('Crude Oil WTI', 'OIL', 'energy', 'West Texas Intermediate crude oil.', 78.32, 3.5, 200, true, 'Settlement T+2. Subject to market volatility.'),
('S&P 500', 'SPX', 'stock', 'US Large Cap Index tracking top 500 companies.', 5432, 1.2, 500, true, 'Settlement T+2. Market hours only.'),
('EUR/USD', 'EURUSD', 'forex', 'Euro vs US Dollar — most traded forex pair.', 1.0845, 0.3, 250, true, 'Settlement T+2. 24/5 trading.'),
('NASDAQ 100', 'NAS', 'stock', 'US Tech Index tracking top 100 tech companies.', 18950, 1.6, 500, true, 'Settlement T+2. Market hours only.')
ON CONFLICT DO NOTHING;

-- Seed payment wallets
INSERT INTO public.market_payment_wallets (crypto_symbol, network, wallet_address, instructions, is_active) VALUES
('USDT', 'TRC20', 'TXYZ1234567890abcdefghijklmnopqrstuv', 'Send USDT on TRC20 network only. Confirm the network before sending.', true),
('USDT', 'ERC20', '0x1234567890abcdef1234567890abcdef12345678', 'Send USDT on ERC20 network only. Gas fees apply.', true),
('BTC', 'BITCOIN', 'bc1q1234567890abcdefghijklmnopqrstuvwxyz', 'Send BTC only. Confirm the address before sending.', true),
('ETH', 'ERC20', '0xabcdef1234567890abcdef1234567890abcdef12', 'Send ETH on ERC20 network only.', true)
ON CONFLICT DO NOTHING;

-- Seed deposit wallets
INSERT INTO public.deposit_wallets (crypto_name, crypto_symbol, wallet_address, network, is_active) VALUES
('Bitcoin', 'BTC', 'bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'BITCOIN', true),
('Ethereum', 'ETH', '0x1111111111111111111111111111111111111111', 'ERC20', true),
('Tether', 'USDT', 'TYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY', 'TRC20', true),
('Tether', 'USDT', '0x2222222222222222222222222222222222222222', 'ERC20', true),
('BNB', 'BNB', '0x3333333333333333333333333333333333333333', 'BEP20', true),
('Solana', 'SOL', '11111111111111111111111111111111111111111111', 'SOL', true)
ON CONFLICT DO NOTHING;

-- Create admin notifications about the new system
DO $$
DECLARE
  admin_ids uuid[];
  uid uuid;
BEGIN
  SELECT ARRAY(SELECT user_id FROM public.user_roles WHERE role IN ('admin', 'super_admin')) INTO admin_ids;
  FOREACH uid IN ARRAY admin_ids
  LOOP
    INSERT INTO public.notifications (user_id, title, message, type) VALUES
    (uid, 'System Setup Complete', 'The iBlockchain platform has been fully configured and is ready for operation.', 'system'),
    (uid, 'Welcome to the Admin Panel', 'You have full administrative access. Review client KYC documents and manage platform operations.', 'system');
  END LOOP;
END $$;

-- Create a sample conversation between admin and user.full
DO $$
DECLARE
  uid uuid;
BEGIN
  SELECT user_id INTO uid FROM public.profiles WHERE email = 'user.full@iblockone.com';
  IF uid IS NOT NULL THEN
    INSERT INTO public.messages (user_id, content, sender_role, created_at) VALUES
    (uid, 'Hello! I would like to know more about the investment plans available.', 'user', NOW() - INTERVAL '2 hours'),
    (uid, 'Thank you for reaching out! We have several plans with competitive returns. Please check the Market section for available assets and their terms.', 'admin', NOW() - INTERVAL '1.5 hours'),
    (uid, 'Great, thank you! I will check them out.', 'user', NOW() - INTERVAL '1 hour');
  END IF;
END $$;

-- Create sample KYC documents for user.kyc
DO $$
DECLARE
  uid uuid;
BEGIN
  SELECT user_id INTO uid FROM public.profiles WHERE email = 'user.kyc@iblockone.com';
  IF uid IS NOT NULL THEN
    INSERT INTO public.kyc_documents (user_id, status, submitted_at) VALUES
    (uid, 'pending', NOW() - INTERVAL '1 day')
    ON CONFLICT (user_id) DO UPDATE SET status = 'pending', submitted_at = NOW() - INTERVAL '1 day';
  END IF;
END $$;
