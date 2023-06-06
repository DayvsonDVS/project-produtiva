<template>
  <div
    class="history-flow"
    v-for="{
      batch_name,
      status,
      description,
      user,
      updated_at,
      receipt
    } in historic.historic"
  >
    <div class="card-batch">
      <h2>Lote</h2>
      <span>{{ batch_name }}</span>
    </div>

    <div class="historic">
      <div class="status">
        <div class="card-status">
          {{ status == 'done' ? 'Concluído' : 'Pendente' }}
          <img v-if="status == 'pending'" src="/svg/X-red.svg" />
          <img v-if="status == 'done'" src="/svg/V-check.svg" />
        </div>

        <div class="attachments">
          <Tag v-if="receipt" @click="openFile(receipt)">
            <img src="/svg/Image.svg" />
            <span>Arquivo</span>
          </Tag>
        </div>
      </div>

      <div class="description">
        {{ description }}
      </div>
    </div>

    <div class="log">
      <h4>
        Usuário: <span class="user">{{ user }}</span>
      </h4>

      <h4>
        Data: <span class="updated-at">{{ updated_at }}</span>
      </h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHistoric } from '@/stores/historic'

const historic = useHistoric()

function openFile(url: string) {
  window.open(url, '_blank')
}
</script>

<style scoped lang="scss">
.history-flow {
  width: 900px;
  height: auto;
  color: #fff;
  padding: 0.4rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: grid;
  align-items: center;
  grid-template-columns: 170px 466px 1fr;
  gap: 1rem;
  .card-batch {
    display: grid;
    justify-content: center;
    justify-items: center;
    gap: 1rem;
    padding: 0.5rem;
    background: rgba(28, 32, 41, 0.5);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    h2 {
      color: aqua;
    }
    span {
      font-weight: 600;
    }
  }
  .historic {
    .status {
      display: grid;
      grid-auto-flow: column;
      align-items: center;
      gap: 1rem;
      padding: 10px;
      .card-status {
        display: grid;
        grid-auto-flow: column;
        justify-content: left;
        align-items: center;
        gap: 1rem;
      }
      .attachments {
        div {
          display: grid;
          grid-auto-flow: column;
          justify-content: center;
          gap: 0.5rem;
          background: rgba(28, 32, 41, 0.5);
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
      }
    }
    .description {
      padding: 0.8rem;
      background: rgba(28, 32, 41, 0.5);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      min-width: 466px;
      min-height: 180px;
    }
  }
  .log {
    padding: 12px;
    background: rgba(28, 32, 41, 0.5);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-auto-flow: row;
    gap: 1rem;
    justify-content: center;
    h4 {
      color: aqua;
      .user {
        font-weight: 400;
        color: #fff;
        white-space: nowrap;
      }
      .updated-at {
        font-weight: 400;
        color: #fff;
        white-space: nowrap;
      }
    }
  }
}
</style>
