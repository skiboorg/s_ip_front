import { boot } from 'quasar/wrappers'
import {Cookies} from "quasar"
import {useAuthStore} from "stores/auth"



export default boot(async({ app, ssrContext,store }) => {
  const authStore = useAuthStore(store)

  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies
  await authStore.getUser()
  // await ComponentStore.get_settings()
  //
  // app.config.globalProperties.$auth = authStore.$state
  // app.config.globalProperties.$settings = ComponentStore.$state.settings

  // let token = cookies.get('auth_token')
  //
  // if (token) {
  //   console.log('Token exists init')
  //   await authStore.getUser()
  // }else {
  //
  // }


})

