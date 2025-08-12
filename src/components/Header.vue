<script  setup>
import { ref } from 'vue';

const props = defineProps({
    modelValue:String
})

const emit = defineEmits(['update:modelValue'])

const onInput = (e)=>{
    emit('update:modelValue',e.target.value)
}
</script>

<template>
    <header class="header-container">
        <div class="text-logo">galleria.</div>
        <input class="input-class" placeholder="Busca tu imagen" :value="modelValue" @input="onInput"  />
        <div></div>
        
    </header>
    
</template>

<style scoped>
.header-container{
    display: grid;
    grid-template-columns: repeat(3 ,1fr);
    align-items: center;
}
.text-logo{
    font-size: 2rem;
    font-weight: 900;
}
.text-right{
    text-transform: uppercase;
    font-size: .8rem;
    color: #737373;
    font-weight: 100;
}

.input-class{
    margin: 0 auto;
    border: none;
    width: 500px;
    padding: 1rem;
    border-radius: 1em;
    color: #434343;
}


@media (max-width: 768px) {
  .header-container {
    gap: 2em;
    
  }
  .input-class{
    max-width: 400px;
  }
}

@media (max-width: 480px) {
  .header-container {
    grid-template-columns: repeat(1 ,1fr);
    
  }
  .input-class{
    margin-top: .4em;
    max-width: 350px;
  }
}

</style>