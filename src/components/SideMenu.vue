<template>
    <div class="sideMenu">
        <h3>Earthquake List</h3>
        <div
            v-for="earthquake in earthquakes"
            :key="earthquake.id"
            class="earthquakes"
            @click="
                store.commit('updateMapCenter', [
                    earthquake.geometry.coordinates[0],
                    earthquake.geometry.coordinates[1],
                ])
            "
        >
            <div class="card">
                <h3>{{ earthquake.properties.title }}</h3>
                <h4>{{ convertToTime(earthquake.properties.time) }}</h4>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { useStore } from "vuex";

export default class SideMenu extends Vue {
    private store = useStore();
    get earthquakes() {
        return this.store.getters.earthquakes.features;
    }

    private convertToTime(time: number) {
        let date: any = new Date(time);
        date =
            ("0" + date.getDate()).slice(-2) +
            "/" +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            "/" +
            date.getFullYear() +
            " " +
            ("0" + date.getHours()).slice(-2) +
            ":" +
            ("0" + date.getMinutes()).slice(-2) +
            ":" +
            ("0" + date.getSeconds()).slice(-2);
        return date;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.sideMenu {
    h3 {
        padding-bottom: 10px;
        border-bottom: 4px solid #78b3d2;
    }
    .earthquakes {
        padding: 10px;
        .card {
            cursor: pointer;
            border: 1px dotted #78b3d2;
            padding: 10px;
            h3 {
                border: none;
                text-decoration: none;
            }
        }
    }
}
</style>
