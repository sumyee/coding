<template>
  <div class="main">
    app
    <router-link :to="{name: 'detail'}">detail</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style lang="less">
.main {
  color: #333;
}
</style>