<script setup>
import {ref,watch} from 'vue'

import ArrowLeft from '@icons/ArrowLeft.vue'
import ArrowRight from '@icons/ArrowRight.vue'

import FinalArrowLeft from '@icons/FinalArrowLeft.vue'
import FinalArrowRight from '@icons/FinalArrowRight.vue'
const props = defineProps({
    page:{
        type:Number,
        required:true
    },
    totalPages:{
        type:Number,
        required:true
    },
    modelValue:{
        type:String
    }
    
})
const emit = defineEmits(['init-page','prev-page','next-page','final-page','update:modelValue'])

const inputValue = ref(props.modelValue || '')

watch(inputValue,(newValue)=>{
    emit('update:modelValue',newValue)
})



</script>

<template>
     <div class="pagination">
      <div style="display: flex; align-items: center;">
        <FinalArrowLeft class="btn-move" @click="$emit('init-page')" :class="[props.page==1?'disabled':'']"/>
        <ArrowLeft style="font-size: 10px;" class="btn-move" @click="$emit('prev-page')" :class="[props.page==1?'disabled':'']"/>
      </div>
      <p>{{props.page}}</p>
      <div style="display: flex; align-items: center;">
        <ArrowRight style="font-size: 10px;" class="btn-move" @click="$emit('next-page')" :class="[props.page==props.totalPages?'disabled':'']"/>
        <FinalArrowRight class="btn-move" @click="$emit('final-page')" :class="[props.page==props.totalPages?'disabled':'']"/>
      </div>
      <div>|</div>
      <div style="color: #444; display: flex; align-items: center; gap: 1em;">
        <p>Go to page</p>
        <input style="width: 30px; border: none; border: 1px solid #5555; border-radius:2px; outline: 1px solid #7777; color: #444;" v-model="inputValue"/>
      </div>
    </div>
</template>

<style scoped>

</style>