export const listAllBlockchains = `SELECT 
    blockchain_id, 
    slug, 
    name, 
    usd, 
    dominance, 
    createdAt, 
    1day_usd_chng AS one_day_chng, 
    7day_usd_chng AS seven_day_chng, 
    30day_usd_chng AS thirty_day_chng 
  FROM 
    blockchain_tvl_chng 
  WHERE 
    display = TRUE 
    AND id IN (
      SELECT 
        MAX(id) 
      FROM 
        blockchain_tvl_chng 
      GROUP BY 
        blockchain_id
    ) 
  ORDER BY 
    blockchain_tvl_chng.dominance DESC;`;

export const listAllExchanges = `SELECT 
    v.exchange_id, 
    e.full_name AS exchange, 
    e.name_id AS slug,
    c.name_id AS coin_slug, 
    c.symbol AS coin, 
    v.vol_24hr_normalized AS vol_24hr, 
    v.1day_vol_norm_chng AS one_day_chng, 
    v.7day_vol_norm_chng AS seven_day_chng, 
    v.30day_vol_norm_chng AS thirty_day_chng, 
    cat.name AS category, 
    v.created_on 
  FROM 
    volume_norm_chng AS v 
    INNER JOIN exchanges AS e ON v.exchange_id = e.id 
    INNER JOIN coins AS c ON e.coin_id = c.id 
    INNER JOIN category AS cat ON e.category_id = cat.id 
  WHERE 
    v.display = TRUE 
    AND v.id IN (
      SELECT 
        MAX(id) 
      FROM 
        volume_norm_chng 
      GROUP BY 
        exchange_id
    ) 
  ORDER BY 
    vol_24hr DESC;`;

export const getDefiMktOverview = `SELECT 
    all_total_usd AS y, 
    createdAt AS x 
  FROM 
    defi_markets 
  ORDER BY 
    createdAt DESC 
  LIMIT 30;`;

export const getDefiMktOverviewChng = `SELECT 
    all_total_usd, 
    1day_usd_chng AS one_day_chng, 
    7day_usd_chng AS seven_day_chng, 
    30day_usd_chng AS thirty_day_chng 
  FROM 
    defi_mkt_chng 
  ORDER BY 
    createdAt DESC 
  LIMIT 1`;

export const globalVolumeOverview = `SELECT 
    totalvolume_usd AS y, 
    updated_at AS x 
  FROM 
    global 
  ORDER BY 
    updated_at DESC 
  LIMIT 30;`;

export const globalVolumeOverviewChng = `SELECT 
    totalvolume_usd, 
    1day_volume_usd_chng AS one_day_chng, 
    7day_volume_usd_chng AS seven_day_chng, 
    30day_volume_usd_chng AS thirty_day_chng 
  FROM 
    global_volume_chng 
  ORDER BY 
    updated_at DESC 
  LIMIT 1`;

export const getExchangeVolumeBySlug = `SELECT 
    v.created_on AS x, 
    v.vol_24hr_normalized AS y 
  FROM 
    exchange_vol AS v 
    INNER JOIN exchanges AS e ON e.id = v.exchange_id 
  WHERE 
    e.name_id = :slug 
  ORDER BY 
    v.created_on DESC 
  LIMIT :periodLimit`;

export const getExchangeMktcapBySlug = `SELECT 
    m.created_on AS x, 
    m.market_cap AS y 
  FROM 
    coin_markets_usd AS m 
    INNER JOIN coins AS c ON m.coin_id = c.id 
    INNER JOIN exchanges AS e ON e.coin_id = c.id
  WHERE 
    e.name_id = :slug 
  ORDER BY 
    m.created_on DESC 
  LIMIT :periodLimit`;

export const getExchangeVolumeChngBySlug = `SELECT 
    v.vol_24hr_normalized, 
    v.1day_vol_norm_chng AS one_day_chng, 
    v.7day_vol_norm_chng AS seven_day_chng, 
    v.30day_vol_norm_chng AS thirty_day_chng 
  FROM 
    volume_norm_chng AS v 
    INNER JOIN exchanges AS e ON e.id = v.exchange_id 
  WHERE 
    e.name_id = :slug 
  ORDER BY 
    v.created_on DESC 
  LIMIT 1;`;

export const getExchangeMktcapChngBySlug = `SELECT 
    m.market_cap, 
    m.1day_mktcap_chng AS one_day_chng, 
    m.7day_mktcap_chng AS seven_day_chng, 
    m.30day_mktcap_chng AS thirty_day_chng 
  FROM 
    mktcap_usd_chng AS m 
    INNER JOIN coins AS c ON c.id = m.coin_id
    INNER JOIN exchanges AS e ON c.id = e.coin_id 
  WHERE 
    e.name_id = :slug 
  ORDER BY 
    m.created_on DESC 
  LIMIT 1;`;

export const getExchangeTvevBySlug = `SELECT 
    t.created_on AS x, 
    t.ratio AS y 
  FROM 
    coin_tvev AS t 
    INNER JOIN coins AS c ON t.coin_id = c.id 
    INNER JOIN exchanges AS e ON c.id = e.coin_id
  WHERE 
    e.name_id = :slug 
  ORDER BY 
    t.created_on DESC 
  LIMIT :periodLimit`;

export const getExchangeTvevChngBySlug = `SELECT 
    t.ratio, 
    t.1day_ratio_chng AS one_day_chng, 
    t.7day_ratio_chng AS seven_day_chng, 
    t.30day_ratio_chng AS thirty_day_chng 
  FROM 
    coin_tvev_chng AS t 
    INNER JOIN coins AS c ON c.id = t.coin_id 
    INNER JOIN exchanges AS e ON c.id = e.coin_id
  WHERE 
    e.name_id = :slug 
  ORDER BY 
    t.created_on DESC 
  LIMIT 1`;

export const getBlockchainTvlForSlug = `SELECT 
    t.createdAt AS x, 
    t.usd AS y 
  FROM 
    blockchain_tvl AS t 
    INNER JOIN blockchains AS b ON b.id = t.blockchain_id 
  WHERE 
    b.slug = :slug 
  ORDER BY 
    t.createdAt DESC 
  LIMIT :periodLimit`;

export const getBlockchainDomForSlug = `SELECT 
    t.createdAt AS x, 
    t.dominance * 100 AS y 
  FROM 
    blockchain_tvl AS t 
    INNER JOIN blockchains AS b ON b.id = t.blockchain_id 
  WHERE 
    b.slug = :slug 
  ORDER BY 
    t.createdAt DESC 
  LIMIT :periodLimit`;

export const getBlockchainTvlChngForSlug = `SELECT 
    usd, 
    1day_usd_chng AS one_day_chng, 
    7day_usd_chng AS seven_day_chng, 
    30day_usd_chng AS thirty_day_chng 
  FROM 
    blockchain_tvl_chng 
  WHERE 
    slug = :slug 
  ORDER BY 
    createdAt DESC 
  LIMIT 1`;

export const getBlockchainCoinMktcapForSlug = `SELECT 
    m.market_cap AS y, 
    m.createdAt AS x 
  FROM 
    blockchains AS b 
    INNER JOIN coin_mkts_usd AS m ON b.coin_id = m.coin_id 
  WHERE 
    b.slug = :slug 
  ORDER BY 
    m.createdAt DESC 
  LIMIT :periodLimit;`;

export const getBlockchainCoinMktcapChngForSlug = `SELECT 
    m.market_cap, 
    m.1day_mktcap_chng AS one_day_chng, 
    m.7day_mktcap_chng AS seven_day_chng, 
    30day_mktcap_chng AS thirty_day_chng 
  FROM 
    blockchains AS b 
    INNER JOIN mktcap_usd_chng AS m ON b.coin_id = m.coin_id 
  WHERE 
    b.slug = :slug 
  ORDER BY 
    m.createdAt DESC 
  LIMIT 1`;

export const getBlockchainRatioForSlug = `SELECT 
    r.createdAt AS x, 
    r.ratio AS y 
  FROM 
    mktcap_tvl_blkchain AS r 
    INNER JOIN blockchains AS b ON b.id = r.blockchain_id 
  WHERE 
    b.slug = :slug 
  ORDER BY 
    r.createdAt DESC 
  LIMIT :periodLimit`;

export const getBlockchainRatioChngForSlug = `SELECT 
    m.ratio, 
    m.1day_ratio_chng AS one_day_chng, 
    m.7day_ratio_chng AS seven_day_chng, 
    30day_ratio_chng AS thirty_day_chng 
  FROM 
    mktcap_tvl_chng AS m 
    INNER JOIN blockchains AS b ON b.id = m.blockchain_id 
  WHERE 
    b.slug = :slug 
  ORDER BY 
    m.createdAt DESC 
  LIMIT 1`;

export const getCoinName = `SELECT 
    name 
  FROM 
    coins 
  WHERE 
    name_id = :slug`;

export const getCoinNameFromExchangeSlug = `SELECT 
    c.name_id AS slug,
    c.name AS name,
    c.symbol AS symbol
  FROM 
    coins AS c 
    INNER JOIN exchanges AS e ON c.id = e.coin_id 
  WHERE 
    e.name_id = :slug`;

export const getExchangeName = `SELECT 
    full_name AS name 
  FROM 
    exchanges 
  WHERE 
    name_id = :slug`;

export const getBlockchainName = `SELECT 
    name 
  FROM 
    blockchains 
  WHERE 
    slug = :slug`;

export const getExchangeProfileBySlug = `SELECT 
    ep.name AS exchange_name,
    ep.year_established,
    ep.description,
    ep.url AS exchange_profile_url,
    ep.reddit,
    ep.twitter,
    ep.telegram,
    ep.centralized
  FROM 
    exchanges AS e 
  JOIN 
    exchange_profile AS ep ON e.id = ep.exchange_id
  WHERE 
    e.name_id = :slug;`;

export const getAllExchangeCoinSlug =
  "SELECT c.name_id AS slug FROM `exchanges` AS e INNER JOIN coins as c ON e.coin_id = c.id WHERE e.active = TRUE AND e.display = TRUE;";

export const getCoinProfileBySlug = `SELECT
    cp.symbol,
    cp.name AS coin_profile_name,
    cp.description,
    cp.homepage,
    cp.subreddit_url
  FROM 
    coins AS c
  JOIN 
    coin_profile AS cp ON c.id = cp.coin_id
  WHERE 
    c.name_id = :slug;`;

export const getExchangeCoinDominanceForSlug =
  "SELECT TRUNCATE(tem.volume / g.totalvolume_btc * 100, 2) AS dominance, tem.date FROM `global` AS g INNER JOIN (SELECT DATE(t.created_on) AS `date`, AVG(t.vol_24hr_normalized) AS volume FROM (SELECT vol.id, vol.exchange_id, e.name_id, vol.vol_24hr, vol.vol_24hr_normalized, vol.created_on FROM `exchange_vol` AS vol INNER JOIN exchanges AS e ON vol.exchange_id = e.id WHERE e.name_id = :slug ORDER BY vol.`created_on` DESC) AS t GROUP BY DATE(t.created_on) ORDER BY `date` DESC) AS tem ON tem.date = DATE(g.updated_at) ORDER BY `tem`.`date` DESC LIMIT :periodLimit;";
