<script setup >
const props = defineProps({
  where: { type: String }
})
</script>

<template>
  <!--<router-link :to="{name: 'about'}">bla</router-link>-->
  <router-link  :to="{name: String(props.where)}" id="closer" class="section-closer animate__animated animate__delay-1s animate__backInDown closer">
    <i class="fa-regular fa-arrow-left"></i>
  </router-link>
</template>