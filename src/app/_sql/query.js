export const listAllBlockchains =
  "SELECT blockchain_id, slug, name, usd, dominance, createdAt, 1day_usd_chng, 7day_usd_chng, 30day_usd_chng FROM `blockchain_tvl_chng` WHERE id IN (SELECT MAX(id) FROM `blockchain_tvl_chng` GROUP BY blockchain_id) ORDER BY `blockchain_tvl_chng`.`dominance` DESC;";
export const listAllExchanges =
  "SELECT v.exchange_id, e.full_name AS exchange, c.name_id AS slug, c.symbol AS coin, v.vol_24hr_normalized AS vol_24hr, v.1day_vol_norm_chng, v.7day_vol_norm_chng, v.30day_vol_norm_chng, cat.name AS `category`, v.created_on FROM `volume_norm_chng` AS v INNER JOIN coins AS c ON v.exchange_id = c.exchange_id INNER JOIN exchanges AS e ON v.exchange_id = e.id INNER JOIN category AS cat ON e.category_id = cat.id WHERE c.active = TRUE AND v.id IN (SELECT MAX(id) FROM `volume_norm_chng` GROUP BY exchange_id) ORDER BY vol_24hr DESC;";
export const getDefiMktOverview =
  "SELECT all_total_usd AS y, createdAt AS x FROM `defi_markets` ORDER BY `createdAt` DESC LIMIT 30;";
