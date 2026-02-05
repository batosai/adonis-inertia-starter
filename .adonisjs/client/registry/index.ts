/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'contacts.index': {
    methods: ["GET","HEAD"],
    pattern: '/contacts',
    tokens: [{"old":"/contacts","type":0,"val":"contacts","end":""}],
    types: placeholder as Registry['contacts.index']['types'],
  },
  'contacts.show': {
    methods: ["GET","HEAD"],
    pattern: '/contacts/:id',
    tokens: [{"old":"/contacts/:id","type":0,"val":"contacts","end":""},{"old":"/contacts/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['contacts.show']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
  'preview_emails.index': {
    methods: ["GET","HEAD"],
    pattern: '/mails/preview',
    tokens: [{"old":"/mails/preview","type":0,"val":"mails","end":""},{"old":"/mails/preview","type":0,"val":"preview","end":""}],
    types: placeholder as Registry['preview_emails.index']['types'],
  },
  'preview_emails.show': {
    methods: ["GET","HEAD"],
    pattern: '/mails/preview/*',
    tokens: [{"old":"/mails/preview/*","type":0,"val":"mails","end":""},{"old":"/mails/preview/*","type":0,"val":"preview","end":""},{"old":"/mails/preview/*","type":2,"val":"*","end":""}],
    types: placeholder as Registry['preview_emails.show']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
