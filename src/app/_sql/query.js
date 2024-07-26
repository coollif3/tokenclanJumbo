export const listAllBlockchains =
  "SELECT blockchain_id, slug, name, usd, dominance, createdAt, 1day_usd_chng AS one_day_chng, 7day_usd_chng AS seven_day_chng, 30day_usd_chng AS thirty_day_chng FROM `blockchain_tvl_chng` WHERE id IN (SELECT MAX(id) FROM `blockchain_tvl_chng` GROUP BY blockchain_id) ORDER BY `blockchain_tvl_chng`.`dominance` DESC;";

export const listAllExchanges =
  "SELECT v.exchange_id, e.full_name AS exchange, c.name_id AS slug, c.symbol AS coin, v.vol_24hr_normalized AS vol_24hr, v.1day_vol_norm_chng AS one_day_chng, v.7day_vol_norm_chng AS seven_day_chng, v.30day_vol_norm_chng AS thirty_day_chng, cat.name AS `category`, v.created_on FROM `volume_norm_chng` AS v INNER JOIN coins AS c ON v.exchange_id = c.exchange_id INNER JOIN exchanges AS e ON v.exchange_id = e.id INNER JOIN category AS cat ON e.category_id = cat.id WHERE c.active = TRUE AND v.id IN (SELECT MAX(id) FROM `volume_norm_chng` GROUP BY exchange_id) ORDER BY vol_24hr DESC;";

export const getDefiMktOverview =
  "SELECT all_total_usd AS y, createdAt AS x FROM `defi_markets` ORDER BY `createdAt` DESC LIMIT 30;";

export const globalVolumeOverview =
  "SELECT totalvolume_usd AS y, updated_at AS x FROM `global` ORDER BY `updated_at` DESC LIMIT 30;";

export const getExchangeVolumeBySlug = `SELECT v.created_on AS x, v.vol_24hr_normalized AS y FROM exchange_vol AS v INNER JOIN exchanges AS e ON e.id = v.exchange_id INNER JOIN coins AS c ON c.id = e.coin_id  WHERE c.name_id = :slug ORDER BY v.created_on DESC LIMIT :periodLimit`;

export const getExchangeMktcapBySlug = `SELECT m.created_on AS x, m.market_cap AS y FROM coin_markets_usd AS m INNER JOIN coins AS c ON m.coin_id = c.id WHERE c.name_id = :slug ORDER BY m.created_on DESC LIMIT :periodLimit`;

export const getExchangeVolumeChngBySlug =
  "SELECT v.vol_24hr_normalized, v.1day_vol_norm_chng AS one_day_chng, v.7day_vol_norm_chng AS seven_day_chng, v.30day_vol_norm_chng AS thirty_day_chng FROM volume_norm_chng AS v INNER JOIN exchanges AS e ON e.id = v.exchange_id INNER JOIN coins AS c ON c.id = e.coin_id WHERE c.name_id = :slug ORDER BY v.created_on DESC LIMIT 1;";

export const getExchangeMktcapChngBySlug =
  "SELECT m.market_cap, m.1day_mktcap_chng AS one_day_chng, m.7day_mktcap_chng AS seven_day_chng, m.30day_mktcap_chng AS thirty_day_chng FROM mktcap_usd_chng AS m INNER JOIN coins AS c ON c.id = m.coin_id WHERE c.name_id = :slug ORDER BY m.created_on DESC LIMIT 1;";

export const getExchangeTvevBySlug =
  "SELECT t.created_on AS x, t.ratio AS y FROM `coin_tvev` AS t INNER JOIN coins AS c ON t.coin_id = c.id WHERE c.name_id = :slug  ORDER BY t.`created_on` DESC LIMIT :periodLimit";

export const getExchangeTvevChngBySlug =
  "SELECT t.ratio, t.1day_ratio_chng AS one_day_chng, t.7day_ratio_chng AS seven_day_chng, t.30day_ratio_chng AS thirty_day_chng FROM coin_tvev_chng AS t INNER JOIN coins AS c ON c.id = t.coin_id WHERE c.name_id = :slug ORDER BY t.created_on DESC LIMIT 1";
