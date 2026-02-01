import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import type { Data } from '@generated/data'

/**
 * A simple translations shape coming from the server.
 * We keep it permissive to match what the server might send.
 */
type Translations = Record<string, string | undefined> | undefined

/**
 * Extend the shared Inertia props with the translations and locale
 * that the middleware attaches to the Inertia response.
 */
type PageProps = Data.SharedProps & {
  translations?: Translations
  locale?: string
}

/**
 * Composable that provides a typed `usePage` and a safe `t` function
 * that guards access to `page.props.translations`.
 */
export function useI18n() {
  const page = usePage<PageProps>()
  const locale = computed(() => page.props.locale ?? 'en')

  /**
   * Translate a key using the shared `translations` prop.
   * - If translations is missing or not an object, the fallback or key is returned.
   * - If the translation value is an empty string, fallback is used.
   */
  function t(key: string, fallback?: string) {
    const translations = page.props.translations

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
