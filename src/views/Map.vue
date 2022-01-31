<template>
    <div class="mapDiv">
        <MapData/>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import MapData from '@/components/MapData.vue'; // @ is an alias to /src

@Options({
  components: {
    MapData,
  },
})
export default class Map extends Vue {
    @Prop({ default: '' })
    msg!: string;
}
</script>