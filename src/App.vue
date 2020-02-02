<template>
  <div id="app">
    <Nav></Nav>
    <div class="main">
      <Breadcrumb></Breadcrumb>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
import Breadcrumb from './components/Breadcrumb.vue'

export default {
  name: 'app',
  components: {
    Nav,
    Breadcrumb
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main{
  width:65%;
  margin:auto;
}
</style>
