-- for blockchains listing page, listing blockchain with their latest record order by dominance with 1,7,30 day percent change

SELECT blockchain_id, name, usd, dominance, createdAt, 1day_usd_chng, 7day_usd_chng, 30day_usd_chng FROM `blockchain_tvl_chng` WHERE id IN (SELECT MAX(id) FROM `blockchain_tvl_chng` GROUP BY blockchain_id) ORDER BY `blockchain_tvl_chng`.`dominance` DESC;