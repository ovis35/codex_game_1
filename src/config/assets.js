const discoveredAssetUrls = import.meta.glob([
  '../assets/sprites/*.{png,jpg,jpeg,webp}',
  '../assets/effects/*.{png,jpg,jpeg,webp}',
  '../assets/backgrounds/*.{png,jpg,jpeg,webp}',
  '../assets/ui/*.{png,jpg,jpeg,webp}',
], {
  eager: true,
  import: 'default',
  query: '?url',
})

export const ASSET_KEYS = {
  player: 'player',
  playerProjectile: 'player-projectile',
  enemyBasic: 'enemy-basic',
  enemyFast: 'enemy-fast',
  enemyTank: 'enemy-tank',
  explosion: 'explosion',
  background: 'space-bg',
  uiIcons: 'ui-icons',
}

export const PLACEHOLDER_KEYS = {
  player: 'player-placeholder',
  playerProjectile: 'projectile-placeholder',
  enemyBasic: 'enemy-placeholder',
  background: 'background-placeholder',
}

export const EXPECTED_ASSETS = {
  player: {
    key: ASSET_KEYS.player,
    path: '../assets/sprites/player.png',
    placeholderKey: PLACEHOLDER_KEYS.player,
    type: 'image',
  },
  playerProjectile: {
    key: ASSET_KEYS.playerProjectile,
    path: '../assets/sprites/player-projectile.png',
    placeholderKey: PLACEHOLDER_KEYS.playerProjectile,
    type: 'image',
  },
  enemyBasic: {
    key: ASSET_KEYS.enemyBasic,
    path: '../assets/sprites/enemy-basic.png',
    placeholderKey: PLACEHOLDER_KEYS.enemyBasic,
    type: 'image',
  },
  enemyFast: {
    key: ASSET_KEYS.enemyFast,
    path: '../assets/sprites/enemy-fast.png',
    fallbackAssetKey: ASSET_KEYS.enemyBasic,
    placeholderKey: PLACEHOLDER_KEYS.enemyBasic,
    type: 'image',
  },
  enemyTank: {
    key: ASSET_KEYS.enemyTank,
    path: '../assets/sprites/enemy-tank.png',
    fallbackAssetKey: ASSET_KEYS.enemyBasic,
    placeholderKey: PLACEHOLDER_KEYS.enemyBasic,
    type: 'image',
  },
  explosion: {
    key: ASSET_KEYS.explosion,
    path: '../assets/effects/explosion.png',
    type: 'spritesheet',
    frameWidth: 64,
    frameHeight: 64,
  },
  background: {
    key: ASSET_KEYS.background,
    path: '../assets/backgrounds/space-bg.png',
    placeholderKey: PLACEHOLDER_KEYS.background,
    type: 'image',
  },
  uiIcons: {
    key: ASSET_KEYS.uiIcons,
    path: '../assets/ui/ui-icons.png',
    type: 'spritesheet',
    frameWidth: 32,
    frameHeight: 32,
  },
}

export function getDiscoveredAssetUrl(asset) {
  return discoveredAssetUrls[asset.path]
}
