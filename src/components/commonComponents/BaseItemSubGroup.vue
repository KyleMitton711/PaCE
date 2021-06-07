<template>
  <BaseItemGroup
    :item="item"
    text
    :prepend-icon="item.icon"
    sub-group
    append-icon="mdi-menu-down"
    class="ml-8 pl-2"
    :noAction="true"
  />
</template>

<script>
  export default {
    name: 'BaseItemSubGroup',

    props: {
      item: {
        type: Object,
        default: () => ({
          avatar: undefined,
          group: undefined, 
          title: undefined,
          children: [],
        }),
      },
    },
  }
</script>
