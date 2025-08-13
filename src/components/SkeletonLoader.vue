<script  setup>
const props = defineProps({
  itemCount:{
    type:Number,
    default:12
  }
})
</script>

<template>
    <!-- SKELETON LOADING -->
      <div  class="image-container">
        <div 
          v-for="n in itemCount" 
          :key="n" 
          class="skeleton-card"
          :style="{ 
            height: Math.floor(Math.random() * 150) + 200 + 'px',
            animationDelay: (n * 100) + 'ms' 
          }"
        >
          <!-- Imagen skeleton -->
          <div class="skeleton skeleton-image"></div>
          
          <!-- Skeleton para botón save -->
          <div class="skeleton skeleton-save-btn"></div>
          
          <!-- Skeleton para contador de vistas -->
          <div class="skeleton skeleton-views"></div>
          
          <!-- Skeleton para tags -->
          <div class="skeleton skeleton-tags"></div>
        </div>
      </div>
</template>

<style scoped>

</style>