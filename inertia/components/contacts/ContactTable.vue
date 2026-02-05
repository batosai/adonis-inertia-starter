<script setup lang="ts">
  import { h, ref, resolveComponent, useTemplateRef } from 'vue'
  import { router } from '@inertiajs/vue3'
  import { toast } from 'vue-sonner'
  import type { TableColumn } from '@nuxt/ui'
  import type { Column } from '@tanstack/vue-table'
  import type { Row } from '@tanstack/vue-table'
  import UiLink from '~/components/ui/UiLink.vue'
  import type { Contact } from '~/types/contact'

  const UButton = resolveComponent('UButton')
  const UCheckbox = resolveComponent('UCheckbox')
  const UDropdownMenu = resolveComponent('UDropdownMenu')

  defineProps<{
    contacts: Contact[]
  }>()

  const table = useTemplateRef('table')
  const rowSelection = ref<Record<string, boolean>>({})
  const sorting = ref([{ id: 'name' as const, desc: false }])

  function getSortableHeader(column: Column<Contact>, label: string) {
    const isSorted = column.getIsSorted()
    return h(UButton, {
      color: 'neutral',
      variant: 'ghost',
      label,
      icon: isSorted
        ? isSorted === 'asc'
          ? 'i-lucide-arrow-up-narrow-wide'
          : 'i-lucide-arrow-down-wide-narrow'
        : 'i-lucide-arrow-up-down',
      class: '-mx-2.5',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
    })
  }

  function getRowItems(row: Row<Contact>) {
    return [
      { type: 'label' as const, label: 'Actions' },
      {
        label: 'Copier l\'email',
        onSelect() {
          navigator.clipboard.writeText(row.original.email).then(() => {
            toast.success('Email copié')
          })
        },
      },
      { type: 'separator' as const },
      {
        label: 'Voir le contact',
        onSelect() {
          router.visit(`/contacts/${row.original.id}`)
        },
      },
      {
        label: 'Modifier',
        onSelect() {
          toast.info('Modifier (demo)')
        },
      },
      {
        label: 'Supprimer',
        color: 'error' as const,
        onSelect() {
          toast.error('Supprimer (demo)')
        },
      },
    ]
  }

  const columns: TableColumn<Contact>[] = [
    {
      id: 'select',
      header: ({ table }) =>
        h(UCheckbox, {
          modelValue: table.getIsSomePageRowsSelected()
            ? 'indeterminate'
            : table.getIsAllPageRowsSelected(),
          'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
            table.toggleAllPageRowsSelected(!!value),
          'aria-label': 'Sélectionner tout',
        }),
      cell: ({ row }) =>
        h(UCheckbox, {
          modelValue: row.getIsSelected(),
          'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
            row.toggleSelected(!!value),
          'aria-label': 'Sélectionner la ligne',
        }),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'id',
      header: ({ column }) => getSortableHeader(column, '#'),
      cell: ({ row }) => `#${row.getValue('id')}`,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => getSortableHeader(column, 'Nom'),
      cell: ({ row }) =>
        h(UiLink, { to: `/contacts/${row.original.id}` }, () => row.original.name),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => getSortableHeader(column, 'Email'),
    },
    {
      id: 'actions',
      enableHiding: false,
      meta: {
        class: {
          td: 'text-right',
        },
      },
      cell: ({ row }) =>
        h(
          UDropdownMenu,
          {
            content: { align: 'end' },
            items: getRowItems(row),
            'aria-label': 'Actions',
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              'aria-label': 'Actions',
            })
        ),
    },
  ]
</script>

<template>
  <div class="flex flex-col flex-1 w-full">
    <UTable
      ref="table"
      v-model:row-selection="rowSelection"
      v-model:sorting="sorting"
      :data="contacts"
      :columns="columns"
      class="flex-1"
    />
    <div
      v-if="Object.keys(rowSelection).length > 0"
      class="px-4 py-3.5 border-t border-accented text-sm text-muted"
    >
      {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length ?? 0 }} sur
      {{ table?.tableApi?.getFilteredRowModel().rows.length ?? 0 }} ligne(s) sélectionnée(s)
    </div>
  </div>
</template>
