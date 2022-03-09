<template>
    <div class="sideMenu" :class="{ 'sidebar-small': sidebarStatus }">
        <button
            class="sidebar-open"
            :class="{ 'sidebar-small': sidebarStatus }"
            @click="toggleSidebar"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#000"
                viewBox="0 0 16 16"
            >
                <path
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                ></path>
            </svg>
        </button>
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
    private sidebarStatus = false;
    get earthquakes() {
        return this.store.getters.earthquakes.features;
    }
    get earthquakesFiltered() {
        if (!this.earthquakes) return this.earthquakes;
        if (this.sortParam === '1') {
            return this.earthquakes.sort((eq1: any, eq2: any) => eq2.properties.time - eq1.properties.time);
        } else if (this.sortParam === '2') {
            return this.earthquakes.sort((eq1: any, eq2: any) => eq1.properties.time - eq2.properties.time);
        } else if (this.sortParam === '3') {
            return this.earthquakes.sort((eq1: any, eq2: any) => eq2.properties.mag - eq1.properties.mag);
        } else {
            return this.earthquakes.sort((eq1: any, eq2: any) => eq1.properties.mag - eq2.properties.mag);
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

    private toggleSidebar() {
        this.sidebarStatus = !this.sidebarStatus;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.sideMenu {
    position: absolute;
    z-index: 2;
    width: 250px;
    height: 100vh;
    background: linear-gradient(-90deg, #5671bd, #789fd2, #78b3d2, #78c5d2);
    background-size: 200% 100%;
    color: #fff;
    border-right: 2px solid #fff;
    overflow-y: scroll;
    scrollbar-width: none;
    animation: gradient 15s ease infinite;
    &::-webkit-scrollbar {
        display: none;
    }
    &.sidebar-small {
        width: 160px;
    }
    .sidebar-open {
        background: rgba(255, 255, 255, 0.7);
        cursor: pointer;
        outline: none;
        border: 1px solid #fff;
        border-radius: 5px;
        padding: 5px;
        width: 30px;
        height: 60px;
        position: absolute;
        top: 50%;
        right: 0;
        transform: rotateY(180deg);
        transition: all 1s;
        &.sidebar-small {
            transform: rotateY(0);
        }
    }
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
