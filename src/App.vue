<template>
  <div id="app">
     <CommonScreenScale>
      <router-view />
    </CommonScreenScale>
  </div>
</template>

<script>
import CommonScreenScale from "@/components/common/CommonScreenScale.vue";

export default {
  components: {
    CommonScreenScale
  },

  data() {
    return {};
  },

  created() {
   
  },

  mounted() {},

  methods: {
    
  },
};
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* background: -webkit-linear-gradient(top,#001A81,#010109);  */
  background: #010109; 
  overflow: hidden;
  font-size: 36px;
}
</style>
