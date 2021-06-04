<template>
  <v-list-item
    ref="wrapper"
    class="mt-6"
    :class=" { 'opened' : opened, 'overflowed': heightOverflowed }"
  >
    <v-list-item-avatar tile size="64">
      <img :src="item.projectLogo">
    </v-list-item-avatar>

    <v-list-item-content ref="content">
      <span v-if="!item.isProgram" class="black--text heading" @click="viewResource(item)" aria-controls>{{item.title}}</span>
      <span v-if="item.isProgram" class="black--text heading program" @click="viewResource(item)" aria-controls>{{item.title}}</span>

      <div v-html="item.overview" v-if="item.overview" class="mt-2 overview mb-0"></div>
      <p v-if="!item.isProgram && item.items && item.items.length > 0" class="mt-6">
        Module {{ item.items[0].itemNum }} of <a @click="viewProgram(item.items[0].id)">{{ item.items[0].title }}</a>
      </p>
      <p class="mt-2 mb-0" v-if="!item.isProgram && item.duration">Duration {{ item.duration }} &nbsp; {{ item.endorsements }}</p>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon @click="toggleResource" v-if="heightOverflowed">
        <v-icon color="grey lighten-1">{{ opened ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "ResourceListItem",
  props: {
    item: Object,
    heightLimit: {
      type: Number,
      default: 140
    }
  },
  data() {
    return {
      opened: false,
      heightOverflowed: false
    };
  },
  methods: {
    viewResource(item) {
      this.$emit('view-resource', item);
    },

    viewProgram(item) {
      this.$emit('view-program', item);
    },

    toggleResource() {
      this.opened = !this.opened;
      if (this.opened) {
        this.$refs.wrapper.$el.style.height = this.$refs.content.clientHeight + 'px';
      } else {
        this.$refs.wrapper.$el.style.height = this.heightLimit + 'px';
      }
    }
  },
  mounted() {
    this.$refs.wrapper.$el.style.height = this.heightLimit + 'px';
    if (this.$refs.content.clientHeight > this.heightLimit) {
      this.heightOverflowed = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-list-item {
  padding-left: 0;
  overflow: hidden;
  position: relative;
  transition: .5s;

  &.overflowed:not(.opened):after {
    content: "";
    position: absolute;
    left: 64px;
    bottom: 0;
    right: 0;
    height: 40px!important;
    min-height: 0;
    background-image: linear-gradient(rgba(0, 0, 0, 0), white);
  }
}

.heading{
  font-weight: 600;
}

.program {
  font-style: all-small-caps;
}

.v-list-item__avatar {
  align-self: flex-start;
}

.v-list-item__action {
  align-self: flex-start;
}

.v-list-item__content {
  align-self: flex-start;
  padding: 16px 0;

  span {
    font-size: 18px;
  }

  p {
    color: #4a4a4a;
    letter-spacing: .5px;
    line-height: 1.5 !important;
  }
}
</style>