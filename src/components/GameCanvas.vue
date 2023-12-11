<template>
  <canvas :ref="setCanvas" width="480" height="320"></canvas>
</template>

<style scoped></style>

<script setup lang="ts">
import { watch, type VNodeRef } from 'vue'
import { fabric } from 'fabric'
import { type GameState } from '@/game'

const gameState = defineModel<GameState>({ required: true })

type HasRect = { rect: fabric.Rect }
type GameStateWithRects = GameState & {
  player: HasRect
  enemies: HasRect[]
}

var canvas = new fabric.StaticCanvas(null)
const playerRect = new fabric.Rect({
  top: 320 - 16,
  left: 0,
  width: 16,
  height: 16,
  fill: 'blue'
})
const enemyRect = new fabric.Rect({
  top: 320 - 16,
  left: 480 - 16,
  width: 16,
  height: 16,
  fill: 'red'
})

const setCanvas: VNodeRef = (el) => {
  if (el instanceof HTMLCanvasElement) {
    canvas = new fabric.StaticCanvas(el)
    canvas.add(playerRect)
    canvas.add(enemyRect)
  }
}

watch(gameState, () => {
  playerRect.set({ top: canvas.getHeight() - gameState.value.player.y - 16 })
  enemyRect.set({ left: gameState.value.enemies[0].x - 16 })
})

setInterval(() => {
  canvas.renderAll()
}, 16)
</script>
