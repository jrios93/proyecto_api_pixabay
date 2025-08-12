<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import Header from './components/Header.vue'
import Eyes from './assets/icons/eyes.vue'
import ArrowLeft from './assets/icons/ArrowLeft.vue'
import ArrowRight from './assets/icons/ArrowRight.vue'
import SadIcon from './assets/icons/SadIcon.vue'
import FinalArrowLeft from './assets/icons/FinalArrowLeft.vue'
import FinalArrowRight from './assets/icons/FinalArrowRight.vue'


const imageList = ref([])
const page = ref(1)
const err = ref(null)
const total = ref(0)
const totalPages = ref(0)
const perPage = ref(50)
const searchPage = ref('')
const isLoading = ref(false)
const searchInput=ref('')

watch( searchInput,async(newSearchInput)=> {
  console.log('AEAAA')
  if (searchInput.value.length <= 3) return
  await fetchData()
  page.value=1
})

watch( page,async(newPage)=> {
  await fetchData()
})

watch(searchPage, async (newSearchPage) => {
  // Convertir a número
  page.value = newSearchPage.replace(/\D/g, '')
  if (page.value==''){
    page.value=1
  }
  await fetchData()
})

const fetchData = async()=>{
  isLoading.value=true
  try {
    const response = await fetch(`https://pixabay.com/api/?key=49140853-c4a00e3a110ecdb4330de34d2&q=${searchInput.value}&image_type=photo&pretty=true&page=${page.value}&per_page=${perPage.value}`)
    if(!response.ok){
      err.value="Error en llamar la data"
    }
    const data = await response.json()
    imageList.value=data['hits']
    total.value = data['totalHits']
    totalPages.value = total.value / perPage.value
  } catch (error) {
    throw new Error(error)
  }finally{
    isLoading.value=false
  }
}


const nextPage = ()=>{

  if (page.value< totalPages.value){
    page.value++ 
  }
}

const finalPage = ()=>{
  page.value= totalPages.value
}

const initPage = ()=>{
  page.value= 1
}
const prevPage = ()=>{
  if (page.value>1){
    page.value--
  }
  return
}

// Función para formatear números grandes (opcional)
const formatViews = (views) => {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M'
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K'
  }
  return views.toString()
}


onMounted(()=>{
  fetchData()
})
</script>

<template>
  <main class="main-container">
    <Header v-model="searchInput" />
    <div class="container-products" v-if="imageList">
      <p v-if="isLoading">Cargando...</p>
      <div class="image-container" v-if="imageList.length>0">
        <div 
          class="image" 
          v-for="(image, index) in imageList" 
          :key="image.id"
          :style="{ animationDelay: (index * 10) + 'ms' }"
        >
          <img :src="image.webformatURL" :alt="['Foto '+ image.tags]" />
          
          <!-- Views counter - mejorado -->
          <div class="custom-views">
            <Eyes/>
            <p>{{ formatViews(image.views) }}</p>
          </div>
          
          <!-- Botón Save estilo Pinterest -->
          <div class="save-btn">
            Guardar
          </div>
          
          <div class="image-info">
            <p class="tags">{{image.tags}}</p>
          </div>
        </div>
      </div>
      <div class="icon-empty-container" v-else>
        <SadIcon class="icon-empty"/>
        <p>No encontramos tu busqueda</p>
      </div>
    </div>
    <p v-else>{{err}}</p>
    <div v-if="imageList.length>0" class="pagination">
      <div  style="display: flex; align-items: center;" >
        <FinalArrowLeft class="btn-move" @click="initPage" :class="[page==1?'disabled':'']"/>
        <ArrowLeft style="font-size: 10px;"  class="btn-move" @click="prevPage" :class="[page==1?'disabled':'']"/>
      </div>
        <p>{{page}}</p>
        <div style="display: flex; align-items: center;">
          <ArrowRight  style="font-size: 10px;" class="btn-move" @click="nextPage" :class="[page==totalPages?'disabled':'']"/>
          <FinalArrowRight class="btn-move" @click="finalPage" :class="[page==totalPages?'disabled':'']"/>
        </div>
        <div>|</div>
        <div style="color: #444; display: flex; align-items: center; gap: 1em;">
          <p>Go to page</p>
          <input  style="width: 30px; border: none; border: 1px solid #5555; border-radius:2px; outline: 1px solid #7777; color: #444;" v-model="searchPage"/>
        </div>
    </div>
    
  </main>
</template>

<style scoped>
.main-container{
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem;
  
}


.image-container{
  column-count: 4;
  column-gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .image-container {
    column-count: 3;
  }
}

@media (max-width: 768px) {
  .image-container {
    column-count: 2;
  }
}

@media (max-width: 480px) {
  .image-container {
    column-count: 1;
  }
}

.image{
  margin-bottom: 2rem;
  position: relative;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  break-inside: avoid;
  cursor: pointer;
  
  /* Animación corregida - ahora SÍ funciona */
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

/* Animación dinámica - ya NO necesitas nth-child! */

.image:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.image img{
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* Zoom sutil en la imagen al hover */
.image:hover img {
  transform: scale(1.05);
}

/* Views counter mejorado */
.custom-views{
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: white;
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(10px);
}

/* Mostrar views al hacer hover */
.image:hover .custom-views {
  opacity: 1;
}

.custom-views p {
  margin: 0;
  line-height: 1;
}

/* Botón Save estilo Pinterest */
.save-btn {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: #e60023;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 24px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
  transform: translateY(-5px);
}

/* Mostrar botón Save al hover */
.image:hover .save-btn {
  opacity: 1;
  transform: translateY(0);
}

.save-btn:hover {
  background: #d50c22;
  transform: scale(1.05);
}

.image-info{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image:hover .image-info {
  opacity: 1;
}

.tags {
  color: white;
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pagination{
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  margin: 0 auto;
}

.btn-move{
  font-size: 14px;
  cursor: pointer;
  padding: 4px;
}

.btn-move:hover{
  background-color: rgba(0, 0, 0, 0.185);
  border-radius: 100%;
  
  
}

.icon-empty-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.icon-empty-container p {
  font-size: 1.5rem;
  color: #777;
  font-weight: 900;
  margin-top: -40px;
}

.icon-empty{
  font-size: 24rem;
  color: rgb(120, 118, 118);

}
/* Animación mejorada - fadeIn + translateY */
@keyframes fadeInUp{
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.disabled{
  opacity: 0.5;
  cursor: not-allowed;
}
</style>