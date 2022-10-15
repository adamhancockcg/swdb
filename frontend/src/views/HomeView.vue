<script setup>
import {reactive, onMounted} from "vue";
import {titleCase} from "../lib/functions";
import axios from "axios";
let state = reactive({keys: []});
const {VITE_API_URL} = import.meta.env;
onMounted(() => {
  console.log(import.meta.env);
  axios.get(`${VITE_API_URL}/`).then((res) => (state.keys = res.data));
});
</script>

<template>
  <main>
    <div class="yellow">Categories</div>
    <hr />
    <div v-for="key in state.keys">
      <router-link :to="{name: 'resource', params: {resource: key}}">
        <div>{{ titleCase(key) }}</div>
      </router-link>
    </div>
  </main>
</template>
