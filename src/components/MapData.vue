<template>
    <div class="mapData">
        <div class="mapContainer" id="mapContainer"></div>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Mapbox from "mapbox-gl";
import { useStore } from "vuex";

@Options({
  // Define component options
  watch: {
    mapCenter: {
      handler(newVal) {
        this.map.panTo(newVal, { duration: 1000 });
      },
      deep: true
    }
  }
})

export default class MapData extends Vue {
    private accessToken =
        "pk.eyJ1Ijoic3BlbmNlaGlrbyIsImEiOiJja3oycHNqbTYwMGEyMnpuMGg5M2Jpbmh3In0.eZG6gxWY-T2eEn_7CqEjNA";
    private map!: any;
    private earthquakes!: any;
    private store = useStore();
    get mapCenter() {
        return this.store.getters.mapCenter;
    }

    async mounted() {
        const differenceInMinutes =
            (new Date().getTime() -
                new Date(this.store.getters.lastUpdate).getTime()) /
            (60 * 1000);
        if (differenceInMinutes > 60) {
            await fetch(
                "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&minmagnitude=3&limit=5000"
            )
                .then((response) => response.json())
                .then((data) => (this.earthquakes = data));
            this.store.commit("updateEarthquakes", this.earthquakes);
        } else {
            this.earthquakes = this.store.getters.earthquakes;
        }
        Mapbox.accessToken = this.accessToken;

        this.map = new Mapbox.Map({
            container: "mapContainer",
            style: "mapbox://styles/mapbox/dark-v10",
            center: [41.015137, 28.97953],
            zoom: 3,
        });
        this.map.addControl(new Mapbox.NavigationControl(), 'bottom-left');
        this.map.on("load", () => {
            // Add a geojson point source.
            // Heatmap layers also work with a vector tile source.
            this.map.addSource("earthquakes", {
                type: "geojson",
                data: this.earthquakes,
            });

            this.map.addLayer(
                {
                    id: "earthquakes-heat",
                    type: "heatmap",
                    source: "earthquakes",
                    maxzoom: 9,
                    paint: {
                        // Increase the heatmap weight based on frequency and property magnitude
                        "heatmap-weight": [
                            "interpolate",
                            ["linear"],
                            ["get", "mag"],
                            0,
                            0,
                            6,
                            1,
                        ],
                        // Increase the heatmap color weight weight by zoom level
                        // heatmap-intensity is a multiplier on top of heatmap-weight
                        "heatmap-intensity": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            0,
                            1,
                            9,
                            3,
                        ],
                        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                        // Begin color ramp at 0-stop with a 0-transparancy color
                        // to create a blur-like effect.
                        "heatmap-color": [
                            "interpolate",
                            ["linear"],
                            ["heatmap-density"],
                            0,
                            "rgba(33,102,172,0)",
                            0.2,
                            "rgb(103,169,207)",
                            0.4,
                            "rgb(209,229,240)",
                            0.6,
                            "rgb(253,219,199)",
                            0.8,
                            "rgb(239,138,98)",
                            1,
                            "rgb(178,24,43)",
                        ],
                        // Adjust the heatmap radius by zoom level
                        "heatmap-radius": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            0,
                            2,
                            9,
                            20,
                        ],
                        // Transition from heatmap to circle layer by zoom level
                        "heatmap-opacity": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            7,
                            1,
                            9,
                            0,
                        ],
                    },
                },
                "waterway-label"
            );

            this.map.addLayer(
                {
                    id: "earthquakes-point",
                    type: "circle",
                    source: "earthquakes",
                    minzoom: 7,
                    paint: {
                        // Size circle radius by earthquake magnitude and zoom level
                        "circle-radius": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            7,
                            [
                                "interpolate",
                                ["linear"],
                                ["get", "mag"],
                                1,
                                1,
                                6,
                                4,
                            ],
                            16,
                            [
                                "interpolate",
                                ["linear"],
                                ["get", "mag"],
                                1,
                                5,
                                6,
                                50,
                            ],
                        ],
                        // Color circle by earthquake magnitude
                        "circle-color": [
                            "interpolate",
                            ["linear"],
                            ["get", "mag"],
                            1,
                            "rgba(33,102,172,0)",
                            2,
                            "rgb(103,169,207)",
                            3,
                            "rgb(209,229,240)",
                            4,
                            "rgb(253,219,199)",
                            5,
                            "rgb(239,138,98)",
                            6,
                            "rgb(178,24,43)",
                        ],
                        "circle-stroke-color": "white",
                        "circle-stroke-width": 1,
                        // Transition from heatmap to circle layer by zoom level
                        "circle-opacity": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            7,
                            0,
                            8,
                            1,
                        ],
                    },
                },
                "waterway-label"
            );
        });
        // this.map.panTo([-153.5558, 59.7455], { duration: 1000 });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.mapContainer {
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    .mapboxgl-canvas {
        width: 100%;
        height: auto;
    }
}
</style>
