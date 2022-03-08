<template>
    <div class="sideMenu">
        <h3>Latest 6000 Earthquakes</h3>
        <select v-model="sortParam">
            <option value="1" selected>Descending Date</option>
            <option value="2">Ascending Date</option>
            <option value="3">Descending Magnitude</option>
            <option value="4">Ascending Magnitude</option>
        </select>
        <div
            v-for="earthquake in earthquakesFiltered"
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
    private sortParam = '1';
    get earthquakes() {
        return this.store.getters.earthquakes.features;
    }
    get earthquakesFiltered() {
        if(!this.earthquakes) return this.earthquakes;
        if(this.sortParam === '1') {
            return this.earthquakes.sort((eq1:any, eq2:any) => eq2.properties.time - eq1.properties.time);
        } else if(this.sortParam === '2') {
            return this.earthquakes.sort((eq1:any, eq2:any) => eq1.properties.time - eq2.properties.time);
        } else if(this.sortParam === '3') {
            return this.earthquakes.sort((eq1:any, eq2:any) => eq2.properties.mag - eq1.properties.mag);
        } else {
            return this.earthquakes.sort((eq1:any, eq2:any) => eq1.properties.mag - eq2.properties.mag);
        }
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
        margin-bottom: 0;
        padding-bottom: 15px;
        border-bottom: 2px solid #fff;
    }
    select {
        border: none;
        outline: none;
        border-bottom: 2px solid #fff;
        background: #485d83;
        color: #fff;
        font-size: 18px;
        text-align: center;
        width: 100%;
        padding: 10px 0;
        margin-bottom: 10px;
        cursor: pointer;
        option {
            background: #7898d2;
        }
    }
    .earthquakes {
        padding: 10px;
        .card {
            cursor: pointer;
            border: 2px solid #7890d2;
            border-radius: 20px;
            padding: 5px;
            transition: all 0.5s;
            &:hover {
                background: #7898d262;
                color: #333;
            }
            h3 {
                padding-bottom: 0;
                border: none;
                text-decoration: none;
            }
        }
    }
}
</style>
