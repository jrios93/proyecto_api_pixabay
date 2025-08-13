<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import Header from './components/Header.vue'
import SadIcon from '@icons/SadIcon.vue'
import SkeletonLoader from './components/SkeletonLoader.vue'
import ImageCard from './components/ImageCard.vue'
import Pagination from './components/Pagination.vue'

import { usePixabayImages } from './composables/usePixabayImages'

const {imageList,err,totalPages,isLoading,fetchData} = usePixabayImages()

const page = ref(1)
const searchPage = ref('')
const searchInput = ref('')

watch(searchInput, async(newSearchInput) => {
  console.log('AEAAA')
  if (searchInput.length <= 3) return
  page.value = 1
  await fetchData(searchInput.value,page.value)
})

watch(page, async() => {
  await fetchData(searchInput.value,page.value)
})

watch(searchPage, async (newSearchPage) => {
  page.value = newSearchPage.replace(/\D/g, '')
  if (page.value == '') {
    page.value = 1
  }
  await fetchData(searchInput.value,page.value)
})


const nextPage = () => {
  if (page.value < totalPages.value) page.value++
}

const finalPage = () => page.value = totalPages.value


const initPage = () => page.value = 1


const prevPage = () => {
  if (page.value > 1)page.value--
}

onMounted(() => {
  fetchData('',page.value)
})
</script>

<template>
  <main class="main-container">
    <Header v-model="searchInput" />
    <div class="container-products" v-if="imageList">
      <SkeletonLoader v-if="isLoading" :item-count="12"/>
      <ImageCard v-else-if="imageList.length>0" :image-list="imageList"/>
      <!-- ESTADO VACÍO -->
      <div class="icon-empty-container" v-else>
        <SadIcon class="icon-empty"/>
        <p>No encontramos tu busqueda</p>
      </div>
    </div>
    
    <p v-else>{{err}}</p>
    <Pagination v-if="imageList.length > 0 && !isLoading" @init-page="initPage" @prev-page="prevPage" @next-page="nextPage" @final-page="finalPage" :page="page" :totalPages="totalPages" v-model="searchPage"/>
    
  </main>
</template>

<style scoped>

</style>