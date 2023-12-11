export type Player = {
  y: number
  lives: number
  vy: number
  vx: number
}

export type Enemy = {
  x: number
  y: number
}

export type GameState = {
  player: Player
  enemies: Enemy[]
  travelled: number
  difficulty: number
}
