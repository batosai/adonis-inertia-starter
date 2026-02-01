import { useI18n } from '../composables/use_i18n'

export default {
  install(app: any) {
    const { t, locale } = useI18n()

    app.provide('t', t)
    app.provide('locale', locale)

    app.config.globalProperties.$t = t
    app.config.globalProperties.$locale = locale
  },
}
