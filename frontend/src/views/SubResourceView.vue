<script setup>
import {reactive, onMounted, computed} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import {titleCase} from "@/lib/functions";
const route = useRoute();
let state = reactive({data: {}});
const {resource, subresource} = route.params;

const {VITE_API_URL} = import.meta.env;
const resourceData = computed(() => {
  return Object.entries(state.data)
    .filter(([key, value]) => {
      if (key != "created" && key != "edited" && key != "url") {
        return true;
      }
    })
    .map((data) => {
      if (data[0] == "homeworld") {
        data[1] = data[1].split("/");
        return data;
      }
      return data;
    });
});

const parseValue = (value) => {
  if (Array.isArray(value)) {
    return value.length;
  } else {
    return value;
  }
};

onMounted(() => {
  axios
    .get(`${VITE_API_URL}/${resource}/${subresource}`)
    .then((res) => (state.data = res.data));
});
</script>
<template>
  <main>
    <router-link to="/">Categories</router-link> >
    <router-link to="/">{{ titleCase(resource) }}</router-link> >
    <router-link to="/">{{ state.data.name }}</router-link>

    <hr />
    <div v-for="[key, value] of resourceData">
      <span class="yellow">{{ titleCase(key) }}</span
      >: <span>{{ parseValue(value) }}</span>
    </div>
  </main>
</template>
