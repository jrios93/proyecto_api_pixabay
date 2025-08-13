<script setup>
import {ref} from 'vue'
import Eyes from '@icons/Eyes.vue'
import { useFormat } from '@/composables/useFormat.js'
import fallbackImage from '@assets/imagesProblem.jpg'


const props = defineProps({
    imageList:{
        type:Array,
        required:true
    }
})

const emit =  defineEmits(['open-modal'])

const {formatViews} = useFormat()

const onImageError = (event)=>{
  event.target.src = fallbackImage
}

const handleImageClick = (image)=>{
  emit('open-modal',image)
}

</script>

<template>
      <div class="image-container">
        <div 
          class="image" 
          v-for="(image, index) in imageList" 
          :key="image.id"
          :style="{ animationDelay: (index * 10) + 'ms' }"
          @click="openModal"
        >
          <img :src="image.webformatURL" :alt="['Foto '+ image.tags]" @error="onImageError" @click="handleImageClick(image)" />
          
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