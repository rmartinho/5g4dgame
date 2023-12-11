<template>
  <GameCanvas v-model="state" />
</template>

<style scoped></style>

<script setup lang="ts">
import { ref } from 'vue'
import GameCanvas from '@/components/GameCanvas.vue'
import { type GameState } from '@/game'

const state = ref<GameState>({
  player: {
    y: 0,
    vy: 0,
    vx: 2,
    lives: 0
  },
  enemies: [
    {
      x: 480,
      y: 0
    }
  ],
  travelled: 0,
  difficulty: 1
})

document.onkeydown = (e) => {
  if (e.key == ' ' && state.value.player.y == 0) {
    state.value.player.vy = 10
  }
}

function updateState() {
  state.value.enemies.forEach((e) => {
    e.x -= state.value.player.vx
    if (e.x < 0) {
      e.x = 480
      state.value.player.vx += 1
      if(state.value.player.vx > 10) {
        state.value.player.vx = 2
      }
    }
  })
  state.value.player.y += state.value.player.vy
  state.value.player.vy -= 1
  if (state.value.player.y <= 0) {
    state.value.player.y = 0
    state.value.player.vy = 0
  }
  // WTF is this hack
  state.value = { ...state.value }
}

setInterval(updateState, 16)
</script>
