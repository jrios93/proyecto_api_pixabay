<script setup>
const props = defineProps({
    image: Object
})
const emit = defineEmits(['close'])
</script>

<template>
    <div class="modal-overlay" @click.self="emit('close')">
        <div class="modal-content">
            <div class="container-left">
                <img :src="image?.largeImageURL" :alt="image?.tags" class="modal-image"/>
            </div>
            <div class="container-right">
                <button @click="emit('close')" class="close-btn">×</button>
                <div class="content-wrapper">
                    <h2>Magna officia eiusmod aliquip nulla occaecat ullamco mollit.</h2>
                    <p>Labore cupidatat quis sunt ipsum fugiat. Non fugiat magna do anim ex et consectetur id enim. Voluptate officia tempor eiusmod quis proident enim officia. Lorem laborum cupidatat anim commodo reprehenderit. Nostrud qui consectetur esse dolor in commodo pariatur eiusmod est in fugiat.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
}

.modal-content {
    display: flex;
    gap: 2rem;
    background: white;
    border-radius: 16px;
    padding: 2rem;
    max-width: 90vw;
    max-height: 90vh;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    animation: slideIn 0.4s ease;
    overflow: hidden;
}

/* CENTRADO PERFECTO DE LA IMAGEN */
.container-left {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 12px;
    padding: 1.5rem;
    position: relative;
}

.modal-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; /* Cambiado de cover a contain para mejor visualización */
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;
}

.modal-image:hover {
    transform: scale(1.02);
}

.container-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 350px;
}

.close-btn {
    position: absolute;
    top: -10px;
    right: -10px;
    background: linear-gradient(45deg, #ef4444, #dc2626);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
    transition: all 0.3s ease;
    z-index: 10;
}

.close-btn:hover {
    background: linear-gradient(45deg, #dc2626, #b91c1c);
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.6);
}

.content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-top: 1rem;
    height: 100%;
    justify-content: center;
}

.container-right h2 {
    font-size: 2rem;
    color: #1f2937;
    font-weight: 700;
    line-height: 1.3;
    margin: 0;
}

.container-right p {
    font-size: 1.1rem;
    color: #6b7280;
    line-height: 1.6;
    margin: 0;
}

/* Animaciones */
@keyframes fadeIn {
    from { 
        opacity: 0; 
    }
    to { 
        opacity: 1; 
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(-20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .modal-content {
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
        max-width: 95vw;
    }
    
    .container-left {
        min-height: 250px;
    }
    
    .container-right {
        min-width: auto;
    }
    
    .container-right h2 {
        font-size: 1.5rem;
    }
    
    .container-right p {
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .modal-content {
        margin: 1rem;
        padding: 1rem;
    }
    
    .container-left {
        min-height: 200px;
        padding: 1rem;
    }
}
</style>