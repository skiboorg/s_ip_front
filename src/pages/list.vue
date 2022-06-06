<template>
  <q-page padding>
    <div class="container">
        <p class=" text-h5 text-primary text-bold">СТАТИСТИКА</p>

      <div class="info q-pa-lg bg-grey-4 q-mb-lg">
        <p class="text-positive text-bold">Всего приход: {{stats.total_income}} Р</p>
        <p class="text-negative text-bold">Всего расход: {{stats.total_outcome}} Р</p>
        <p class="text-primary text-bold">Всего вывод: {{stats.total_withdraw}} Р</p>
     </div>
      <p class="text-h5 text-primary text-bold">ИНФОРМАЦИЯ ПО ЮР ЛИЦАМ</p>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6" v-for="item in items" :key="item.id">
        <div class="bg-grey-4 q-pa-lg cursor-pointer" @click="$router.push(`/item?id=${item.id}`)">
          <div class="flex items-center justify-between q-mb-md">
            <p class="no-margin text-h5 text-primary text-bold text-uppercase">{{item.name}}</p>
            <p class="no-margin text-caption text-grey-7 text-caption">{{item.status}}</p>
          </div>

          <div class="flex items-center justify-between">
            <p class="no-margin text-positive text-bold">Приход: {{item.income_amount}} Р</p>
            <p class="no-margin text-negative text-bold">Расход: {{item.outcome_amount}} Р</p>
            <p class="no-margin text-primary text-bold">Вывод: {{item.withdraw_amount}} Р</p>

          </div>

        </div>
      </div>
    </div>
    </div>

  </q-page>
</template>
<script setup>

import {onBeforeMount, ref} from "vue";
import {api} from "boot/axios";
let items = ref([])
let stats = ref({
  total_income:0,
  total_outcome:0,
  total_withdraw:0,
})

onBeforeMount(async ()=>{
  const resp = await api.get('/api/data/items')
  items.value = resp.data
  for (let item of items.value){
    stats.value.total_income += parseFloat(item.income_amount)
    stats.value.total_outcome += parseFloat(item.outcome_amount)
    stats.value.total_withdraw += parseFloat(item.withdraw_amount)

  }
})

</script>
