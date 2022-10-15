<script setup>
import {reactive, onMounted} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import {titleCase} from "@/lib/functions";

const {VITE_API_URL} = import.meta.env;

const route = useRoute();
let state = reactive({data: []});

const {resource} = route.params;

const link = (resource, index) => {
  return `/${resource.toLowerCase()}/${index}`;
};

const title = (item) => {
  const name =
    item.name || `${item.title} (${item.release_date.split("-")[0]})`;
  return titleCase(name);
};

onMounted(() => {
  axios
    .get(`${VITE_API_URL}/${resource}`)
    .then((res) => (state.data = res.data));
});
</script>
<template>
  <main>
    <router-link to="/">Categories</router-link> >
    <router-link to="/">{{ titleCase(resource) }}</router-link>

    <hr />
    <div v-for="(item, index) of state.data">
      <router-link :to="link(resource, index)">
        {{ title(item) }}
      </router-link>
    </div>
  </main>
</template>
