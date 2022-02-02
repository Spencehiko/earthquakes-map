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
        background: linear-gradient(-90deg, #7890d2, #789fd2, #78b3d2, #78c5d2);
        background-size: 200% 100%;
        color: #fff;
        border-right: 2px solid #fff;
        overflow-y: scroll;
        scrollbar-width: none;
        animation: gradient 15s ease infinite;
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
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
}
</style>