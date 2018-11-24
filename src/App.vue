<template>
    <div id="app">
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<script>
export default {
  name: "App",
  created() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      this.$router.push("/login");
    }
    // console.log(this.$route.path);
  },
  mounted() {
    // history.pushState(null, null, document.URL);
    // window.addEventListener("popstate", function() {
    //   history.pushState(null, null, document.URL);
    // });
    history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function() {
      window.history.go(1);
    });    
  }
};
</script>
