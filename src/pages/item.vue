<template>
  <q-page padding>
    <div class="container">
<!--      <pre>-->
<!--       {{item}}-->
<!--      </pre>-->

      <q-btn class="q-mb-lg" icon="west" to="/list" label="назад" outline color="primary"/>
      <p class="text-h5 text-primary text-bold text-uppercase">{{item.name}} <span class="text-caption text-grey-7">({{item.status}})</span></p>
      <div class="info q-pa-lg bg-grey-4 q-mb-lg">
        <div class="" v-html="item.description"></div>

      </div>
      <div class="flex items-center justify-between q-mb-lg">
        <p class="no-margin text-positive text-bold">Приход: {{item.income_amount}} Р</p>
        <p class="no-margin text-negative text-bold">Расход: {{item.outcome_amount}} Р</p>
        <p class="no-margin text-primary text-bold">Вывод: {{item.withdraw_amount}} Р</p>

      </div>
      <q-list bordered separator>

        <q-item v-for="row in item.rows" :key="row.id">
          <q-item-section v-if="row.is_income" class="text-bold text-positive">ПРИХОД</q-item-section>
          <q-item-section v-if="row.is_outcome" class="text-bold text-negative">РACХОД</q-item-section>
          <q-item-section v-if="row.is_withdraw" class="text-bold text-primary">ВЫВОД</q-item-section>
          <q-item-section>{{row.amount}} руб</q-item-section>
          <q-item-section>{{new Date(row.created_at).toLocaleDateString()}}</q-item-section>
          <q-item-section>
            <q-list  separator>
              <q-item clickable :href="file.file" v-for="file in row.files">
                <q-item-section>{{file.name}}</q-item-section>
              </q-item>



            </q-list>
          </q-item-section>
        </q-item>


      </q-list>
    </div>

  </q-page>
</template>
<script setup>
import {useRoute} from 'vue-router'
import {onBeforeMount, ref, computed} from "vue";
import {api} from "boot/axios";
const route=useRoute()
const item_id = computed(() =>route.query.id)
const item = ref({})


onBeforeMount(async ()=>{
  const resp = await api.get(`/api/data/item?id=${item_id.value}`)
  item.value = resp.data
})



</script>
