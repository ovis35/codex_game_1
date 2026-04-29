# Asset Notes

## Player Sprite

- Generated filename: `src/assets/sprites/player.png`
- Intended in-game size: about `64 x 64 px`
- Source generation: `C:\Users\user\.codex\generated_images\019dd970-41c9-7ee0-8d58-b89ba37e6c54\ig_067a10f41673e4030169f211f1b3b0819192d80228b5a0b3aa.png`
- Visual assumptions: right-facing small sugar candy fairy with a rounded dessert-fantasy silhouette, pastel readable colors, tiny candy wings, and a compact arcade-sprite shape.
- Current placeholder mapping: loads as the `player` asset key from `src/config/assets.js` and replaces the generated `player-placeholder` texture when present.
- Fallback behavior if missing: `GameScene` keeps using the current generated blue rounded player placeholder with the yellow nose.

## Player Projectile Sprite Sheet

- Generated filename: `src/assets/sprites/player-projectile.png`
- Frame count: `6`
- Frame size: `32 x 32 px`
- Sheet layout: horizontal `1 x 6`, total size `192 x 32 px`
- Intended Phaser animation key: `player-projectile-fly`
- Visual assumptions: glowing sugar-energy orb with candy-light sparkles, readable against a light dessert background, pulsing left-to-right in the same soft dessert fantasy style as the player sprite.
- Current placeholder mapping: intended to replace the generated `projectile-placeholder` texture for player shots once projectile sprite-sheet loading/animation is wired.
- Fallback behavior if missing: `GameScene` keeps using the current generated small yellow rounded projectile placeholder.
