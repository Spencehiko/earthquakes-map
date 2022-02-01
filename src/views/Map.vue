<template>
    <div class="mapDiv">
        <SideMenu class="side-menu" />
        <MapData class="map-data" />
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import MapData from "@/components/MapData.vue"; // @ is an alias to /src
import SideMenu from "@/components/SideMenu.vue"; // @ is an alias to /src

@Options({
    components: {
        SideMenu,
        MapData,
    },
})
export default class Map extends Vue {
    @Prop({ default: "" })
    msg!: string;
}
</script>
<style lang="less" scoped>
.mapDiv {
    .side-menu {
        position: absolute;
        z-index: 2;
        width: 250px;
        height: 100vh;
        background: #191a1a;
        color: #fff;
        border-right: 3px solid #78b3d2;
        overflow-y: scroll;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    .map-data {
        position: absolute;
        top: 0;
        left: 250px;
        width: calc(100% - 250px);
        height: 100vh;
    }
}
</style>