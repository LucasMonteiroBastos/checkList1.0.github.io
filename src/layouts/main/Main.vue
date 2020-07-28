<template>
        <div class="contentAreaClass">
            <div class="content-wrapper">
                <div class="content-wrapper">
                   <transition :name="routerTransition" mode="out-in">
                       <router-view @changeRouteTitle="changeRouteTitle"></router-view>
                    </transition>
                </div>
            </div>
        </div>
</template>

<script>
import VxSidebar from '@/layouts/components/vx-sidebar/VxSidebar.vue';
//import TheNavbar from '../components/TheNavbar.vue';
import TheFooter from '../components/TheFooter.vue';
import themeConfig from '@/../themeConfig.js';
import sidebarItems from "@/layouts/components/vx-sidebar/sidebarItems.js";
import BackToTop from 'vue-backtotop'

export default {
    data() {
        return {
            navbarType: themeConfig.navbarType || 'floating',
            navbarColor: themeConfig.navbarColor || '#fff',
            footerType: themeConfig.footerType || 'static',
            routerTransition: themeConfig.routerTransition || 'none',
            isNavbarDark: false,
            routeTitle: this.$route.meta.pageTitle,
            sidebarItems: sidebarItems,
            disableCustomizer: themeConfig.disableCustomizer,
            windowWidth: window.innerWidth, //width of windows
            hideScrollToTop: themeConfig.hideScrollToTop,
            disableThemeTour: themeConfig.disableThemeTour
        }
    },
    watch: {
        '$route'() {
            this.routeTitle = this.$route.meta.pageTitle;
        },
        isThemeDark(val) {
            if(this.navbarColor == "#fff" && val) {
                this.updateNavbarColor("#10163a")
            }else {
                this.updateNavbarColor("#fff")
            }
        },
    },
    computed: {
        isAppPage() {
            if(this.$route.path.includes('/apps/')) return true
            else return false
        },
        isThemeDark() { return this.$store.state.theme == 'dark' },
        sidebarWidth() {
            return this.$store.state.sidebarWidth;
        },
        bodyOverlay() {
            return this.$store.state.bodyOverlay;
        },
        contentAreaClass() {
            if(this.sidebarWidth == "default") return "content-area-default"
            else if(this.sidebarWidth == "reduced") return "content-area-reduced"
            else if(this.sidebarWidth) return "content-area-full"
        },
        navbarClasses() {
            return {
                'navbar-hidden': this.navbarType == 'hidden',
                'navbar-sticky': this.navbarType == 'sticky',
                'navbar-static': this.navbarType == 'static',
                'navbar-floating': this.navbarType == 'floating',
            }
        },
        footerClasses() {
            return {
                'footer-hidden': this.footerType == 'hidden',
                'footer-sticky': this.footerType == 'sticky',
                'footer-static': this.footerType == 'static',
            }
        },
    },
    methods: {
        changeRouteTitle(title) {
            this.routeTitle = title;
        },
        updateNavbarColor(val) {
            this.navbarColor = val;
            if(val == "#fff") this.isNavbarDark = false
            else this.isNavbarDark = true
        },
        handleWindowResize(event) {
            this.windowWidth = event.currentTarget.innerWidth;
            this.setSidebarWidth();
        },
        setSidebarWidth() {
            if (this.windowWidth < 1200) {
                this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', false)
                this.$store.dispatch('updateSidebarWidth', 'no-sidebar')
                this.disableThemeTour = true;
            }
            else if(this.windowWidth < 1200) {
                this.$store.dispatch('updateSidebarWidth', 'reduced')
            }
            else {
                this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true)
            }
        },
        toggleHideScrollToTop(val) {
            this.hideScrollToTop = val;
        }
    },
    components: {
        VxSidebar,
        //TheNavbar,
        TheFooter,
        BackToTop
    },
    created() {
        this.setSidebarWidth();
        if(this.navbarColor == "#fff" && this.isThemeDark) {
            this.updateNavbarColor("#10163a")
        }else {
            this.updateNavbarColor(this.navbarColor)
        }
    }
}
</script>


<style lang="scss">
#app {
    top: 10%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  //color: black;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}

</style>
