<template>
  <q-page padding>
    <div  class="container">
<!--      <pre>-->
<!--       {{item.accounts.filter(account => account.rows.filter(row => row.month.id === 1))}}-->
<!--      </pre>-->

      <q-btn class="q-mb-lg" icon="west" to="/list" label="назад" outline color="primary"/>
      <p class="text-h5 text-primary text-bold text-uppercase">{{item.name}} <span class="text-caption text-grey-7">({{item.status}})</span></p>
      <div class="flex items-center justify-between q-mb-lg">
        <p class="no-margin text-positive text-bold">Приход: {{item.income_amount}} Р</p>
        <p class="no-margin text-negative text-bold">Расход: {{item.outcome_amount}} Р</p>
        <p class="no-margin text-primary text-bold">Вывод: {{item.withdraw_amount}} Р</p>

      </div>
      <div class="info q-pa-lg bg-grey-4 q-mb-lg">
        <div class="" v-html="item.description"></div>
      </div>

      <div class="">

        <q-tabs
          v-model="cur_month_tab"
          class="text-primary q-mb-md"
        >
          <q-tab @click="changeMonth(j)" v-for="(i,j) in months" :name="j"  :label="i.name" />
        </q-tabs>
      </div>


      <div class="" v-for="account in item.accounts" :key="account.id">
        <div class="bg-grey-4 q-pa-md text-bold flex items-center justify-between">
          <p class="no-margin">
            Р/С #{{account.account}}
          </p>
          <div class="flex items-center justify-between ">
            <p class="q-mb-none text-positive text-bold q-mr-md text-orange">Лимит: {{account.limit}} Р</p>

              <p class="q-mb-none text-positive text-bold q-mr-md">Приход: {{account.month_amount.find(x=>x.id===cur_month.id).income_amount}} Р</p>
              <p class="q-mb-none text-negative text-bold q-mr-md">Расход: {{account.month_amount.find(x=>x.id===cur_month.id).outcome_amount}} Р</p>
              <p class="q-mb-none text-primary text-bold">Вывод: {{account.month_amount.find(x=>x.id===cur_month.id).withdraw_amount}} Р</p>



          </div>

        </div>
        <q-list v-if="item.accounts.length>0" bordered separator>

          <q-item v-show="row.month.id===cur_month.id" v-for="row in account.rows" :key="row.id">

            <q-item-section v-if="row.is_income" class="text-bold text-positive">ПРИХОД</q-item-section>
            <q-item-section v-if="row.is_outcome" class="text-bold text-negative">РACХОД</q-item-section>
            <q-item-section v-if="row.is_withdraw" class="text-bold text-primary">ВЫВОД</q-item-section>
            <q-item-section v-html="row.description"></q-item-section>
            <q-item-section>{{row.amount}} руб</q-item-section>
            <q-item-section>{{new Date(row.created).toLocaleDateString()}}</q-item-section>
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
const months = ref([])
const cur_month_tab = ref(0)
const cur_month = ref({})


onBeforeMount(async ()=>{
  const resp = await api.get(`/api/data/item?id=${item_id.value}`)
  item.value = resp.data
  const resp_m = await api.get(`/api/data/months`)
  months.value = resp_m.data
  cur_month.value = months.value[0]
})

function changeMonth(i){
  cur_month.value = months.value[i]
}

function filterAccounts(){
  console.log()
}


</script>
