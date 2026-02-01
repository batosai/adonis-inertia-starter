import { usePage } from '@inertiajs/vue3'
import { computed, ref, watch } from 'vue'
import type { Data } from '@generated/data'

type Translations = Record<string, string | undefined> | undefined

type PageProps = Data.SharedProps & {
  translations?: Translations
  locale?: string
}

/**
 * Global cache for translations to persist across partial Inertia requests
 */
const translationsCache = ref<Translations>(undefined)

export function useI18n() {
  const page = usePage<PageProps>()
  const locale = computed(() => page.props.locale ?? 'en')

  watch(
    () => page.props?.translations,
    (newTranslations) => {
      if (newTranslations) {
        translationsCache.value = newTranslations
      }
    },
    { immediate: true }
  )

  /**
   * Translate a key using the shared `translations` prop or the cache.
   * - On first load: uses page.props.translations
   * - On partial requests: uses translationsCache (persisted in memory)
   * - If translations is missing or not an object, the fallback or key is returned.
   * - If the translation value is an empty string, fallback is used.
   */
  function t(key: string, fallback?: string) {
    // Try to use translations from props first (initial load)
    let translations = page.props.translations

    // If not in props, fall back to cached translations (partial requests)
    if (!translations && translationsCache.value) {
      translations = translationsCache.value
    }

    if (translations && typeof translations === 'object') {
      const value = translations[key]
      if (typeof value === 'string' && value.length > 0) {
        return value
      }
    }

    return fallback ?? key
  }

  return {
    locale,
    t,
  }
}
