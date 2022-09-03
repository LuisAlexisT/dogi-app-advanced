<template>
  <b-navbar sticky toggleable="md" type="dark" variant="dark">
    <b-navbar-brand to="/">
      <font-awesome-icon :icon="['fas', 'dog']" /> Perritos
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle>
    <b-navbar-nav class="d-block d-lg-none w-100">
      <doggie-searcher id="mblSearchContainer" input-id="input-mbl" container="mblSearchContainer"></doggie-searcher>
    </b-navbar-nav>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="mx-auto d-none d-lg-block">
        <doggie-searcher id="dskSearchContainer" input-id="input-dsk" container="dskSearchContainer"></doggie-searcher>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/breeds">
          <font-awesome-icon class="text-warning" icon="paw" /> Razas
        </b-nav-item>
        <b-nav-item to="/randoms">
          <font-awesome-icon icon="hotdog" /> Aleatorios
        </b-nav-item>
        <b-nav-item to="/wishlist">
          <font-awesome-icon class="text-danger" icon="heart" /> Favoritos
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import DoggieSearcher from '~/components/DoggieSearcher.vue'
export default {
  name: 'NavBar',
  components: {
    DoggieSearcher
  },
}
</script>

<style>

</style>