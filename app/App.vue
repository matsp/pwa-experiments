<template>
  <m-typography class="app-body">
    <m-toolbar
      ref="toolbar"
      fixed
      waterfall>
      <m-toolbar-row shrink-center>
        <m-toolbar-icon
          slot="start"
          icon="menu"
          menu-icon
          @click="toggleDrawer()"/>
        PWA with VueJS
      </m-toolbar-row>
    </m-toolbar>
    <m-drawer-temporary ref="drawer">
      <m-drawer-toolbar-spacer
        class="mdc-theme--primary-bg"
        slot="toolbarSpacer"/>
      <m-drawer-content>
        <m-list dense>
          <m-list-item
            v-for="item in listItems"
            :key="item.text"
            @click="openRoute(item.route)"
            interactive>
            <m-icon
              slot="graphic"
              :icon="item.icon"/>
            {{ item.text }}
          </m-list-item>
        </m-list>
      </m-drawer-content>
    </m-drawer-temporary>
    <div class="app-content">
      <m-toolbar-fixed-adjust>
        <main>
          <m-layout-grid>
            <keep-alive>
              <router-view />
            </keep-alive>
          </m-layout-grid>
        </main>
      </m-toolbar-fixed-adjust>
    </div>
  </m-typography>
</template>

<script>
export default {
  computed: {
    listItems () {
      return this.$store.state.app.drawerListItems
    }
  },
  methods: {
    toggleDrawer () {
      this.$refs.drawer.toggle()
    },
    openRoute (route) {
      this.$router.push(route)
      this.toggleDrawer()
    }
  }
}
</script>

<style lang="scss">
@import "styles/app";

.app-body {
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}

.app-content {
  margin: 0;
  display: inline-flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  box-sizing: border-box;
}

.app-toolbar-row-right {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
