<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>


        <q-toolbar-title>
          Lorem ipsum.
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"

      behavior="mobile"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>


      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {api} from "boot/axios";
import { useAuthStore } from 'stores/auth'
import {ref,onBeforeMount} from 'vue'
import {useNotify} from "src/helpers/notify";

export default {

  preFetch ({ store, redirect }) {
    const auth_store = useAuthStore(store)

    if (!auth_store.loggedIn) {
      redirect({ path: '/' })
    }

  },
  setup () {
    const leftDrawerOpen = ref(false)

    return {

      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }


}
</script>
