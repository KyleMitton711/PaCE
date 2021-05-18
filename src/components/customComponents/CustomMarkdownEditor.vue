<template>
  <div class="editor white pa-4">
      <v-row>
          <v-col cols="6">
              <v-textarea v-model="input" @input="update"></v-textarea>
          </v-col>
          <v-col cols="6">
              <div v-html="compiledMarkdown"></div>
          </v-col>
      </v-row>
  </div>
</template>

<script>
import marked from "marked";
import { debounce } from "lodash";
export default {
  name: "CustomMarkdownEditor",
  components: {},
  data() {
    return {
      input: "",
      markedInput: ""
    };
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.markedInput, { sanitize: true });
    },
  },
  methods: {
    update: debounce(function (e) {
      this.markedInput = this.input;
    }, 300),
  },
};
</script>

<style lang="scss" scoped>
.editor {

}
</style>