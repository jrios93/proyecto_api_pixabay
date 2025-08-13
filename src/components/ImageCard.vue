<script setup>
import Eyes from '@icons/Eyes.vue'
import { useFormat } from '@/composables/useFormat.js'
const props = defineProps({
    imageList:{
        type:Array,
        required:true
    }
})

const {formatViews} = useFormat()

</script>

<template>
      <div class="image-container">
        <div 
          class="image" 
          v-for="(image, index) in imageList" 
          :key="image.id"
          :style="{ animationDelay: (index * 10) + 'ms' }"
        >
          <img :src="image.webformatURL" :alt="['Foto '+ image.tags]" />
          
          <div class="custom-views">
            <Eyes/>
            <p>{{ formatViews(image.views) }}</p>
          </div>
          
          <div class="save-btn">
            Guardar
          </div>
          
          <div class="image-info">
            <p class="tags">{{image.tags}}</p>
          </div>
        </div>
      </div>
</template>

<style scoped>

</style>