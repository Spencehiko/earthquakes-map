<template>
    <div class="mapDiv">
        <SideMenu />
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
    .map-data {
        width: 100%;
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