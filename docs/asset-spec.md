# Asset Pipeline Spec

This shooter currently uses Phaser-generated placeholder shapes. Future visual assets should be dropped into the paths below and loaded only after gameplay remains stable. Keep original source files outside the runtime folders if they are large or layered editor files.

## General Requirements

- Use PNG for static sprites and PNG sprite sheets for frame animation.
- Use transparent backgrounds for actors, projectiles, effects, and UI icons.
- Keep sprite silhouettes readable at the current 960 x 540 game size.
- Preserve the current collision intent: player, projectile, and enemy artwork may extend slightly beyond the existing physics bodies, but the interactive footprint should feel the same.
- If any asset is missing, the game should keep using the current generated placeholder texture for that object.

## Player Sprite

- Filename: `player.png`
- Folder path: `src/assets/sprites/player.png`
- Recommended size: `72 x 40 px`
- Transparent background: yes
- Type: static image
- Animation frame count: none
- Current placeholder mapping: replaces the `player-placeholder` generated texture used by the player ship at `x = 110`, centered vertically at game start.
- Fallback behavior: generate and use the current rounded blue body with yellow nose placeholder.

## Player Projectile

- Filename: `player-projectile.png`
- Folder path: `src/assets/sprites/player-projectile.png`
- Recommended size: `22 x 10 px`
- Transparent background: yes
- Type: static image
- Animation frame count: none
- Current placeholder mapping: replaces the `projectile-placeholder` texture fired from the player at the current projectile speed.
- Fallback behavior: generate and use the current small yellow rounded projectile placeholder.

## Basic Enemy

- Filename: `enemy-basic.png`
- Folder path: `src/assets/sprites/enemy-basic.png`
- Recommended size: `46 x 46 px`
- Transparent background: yes
- Type: static image
- Animation frame count: none
- Current placeholder mapping: replaces the current `enemy-placeholder` texture for standard right-to-left enemies.
- Fallback behavior: generate and use the current pink rounded enemy placeholder with simple white eyes.

## Fast Enemy

- Filename: `enemy-fast.png`
- Folder path: `src/assets/sprites/enemy-fast.png`
- Recommended size: `42 x 34 px`
- Transparent background: yes
- Type: static image
- Animation frame count: none
- Current placeholder mapping: reserved for a future enemy variant that should use the same spawn lane and leftward movement pattern with a smaller, faster silhouette.
- Fallback behavior: use `enemy-basic.png` if available; otherwise use the current generated enemy placeholder.

## Tank Enemy

- Filename: `enemy-tank.png`
- Folder path: `src/assets/sprites/enemy-tank.png`
- Recommended size: `64 x 56 px`
- Transparent background: yes
- Type: static image
- Animation frame count: none
- Current placeholder mapping: reserved for a future enemy variant that should use the same enemy group and player collision behavior, with a larger visual footprint.
- Fallback behavior: use `enemy-basic.png` if available; otherwise use the current generated enemy placeholder.

## Explosion Effect

- Filename: `explosion.png`
- Folder path: `src/assets/effects/explosion.png`
- Recommended size: `384 x 64 px` total, with six `64 x 64 px` frames arranged horizontally
- Transparent background: yes
- Type: sprite sheet
- Animation frame count: `6`
- Current placeholder mapping: should play at the enemy position when a projectile destroys an enemy, replacing the instant disappearance with a short visual effect while keeping scoring and destruction behavior the same.
- Fallback behavior: skip the animation and keep the current immediate enemy/projectile destroy behavior.

## Scrolling Background

- Filename: `space-bg.png`
- Folder path: `src/assets/backgrounds/space-bg.png`
- Recommended size: `960 x 540 px`, tileable horizontally if possible
- Transparent background: no
- Type: static image
- Animation frame count: none
- Current placeholder mapping: replaces the current code-drawn pale background dots and guide lines in `GameScene`.
- Fallback behavior: draw the current pale background, pastel dots, and top/bottom guide lines.

## UI Icons

- Filename: `ui-icons.png`
- Folder path: `src/assets/ui/ui-icons.png`
- Recommended size: `128 x 32 px` total, with four `32 x 32 px` frames arranged horizontally
- Transparent background: yes
- Type: sprite sheet
- Animation frame count: `4`
- Current placeholder mapping: optional future icons for score, start, restart, or control prompts. Current UI is text-only, so icons are not required for the present prototype.
- Fallback behavior: keep the current text-only UI labels and prompts.
