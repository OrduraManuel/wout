<script setup>
import toBack from '@/components/toBack.vue';
//import tableTipologie from '@/components/tableTipologie.vue';

import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";

// store pinia
//import { useTipologieStore } from '@/stores'
//import { storeToRefs } from 'pinia';

const router = useRouter();
//const simulazioniStore = useSimulazioniStore()
//const { mySimulazioni } = storeToRefs(simulazioniStore)


onMounted(() => {
    //searchHandler()
})
async function  searchHandler() {
    await simulazioniStore.thisSimulazioni();

}

</script>

<template>
    <section id="tipologie" >
        <toBack  where="home"/>
        <div class="container-fluid">
            <div class="row mb-5">
                pagina readSimulazioni, qua ci andrà il componente tabella
            </div>
            <!--<router-link ref="testRef" id="createBtn"  :to="{ name: 'createTipo' }">
                <i class="fa-solid fa-plus"></i>
            </router-link>-->
        </div>
    </section>
</template>
<style lang="scss" scoped>
.nav{
padding: 2rem;
    li{
        margin: 0 .3rem;
        button{
        background: var(--brandPrimary);
        color: var(--txtLight);
        &:hover,:checked{
            background-color: transparent;
            padding: .5rem 1rem;
            color: var(--brandPrimary);
            border-radius: var(--radiusL);
            transition: all 0.25s ease-in-out;
            border: var(--borderSize) var(--borderStyle) var(--brandPrimary);
        }
    }
        .active{
            background-color: transparent!important;
            padding: .5rem 1rem!important;
            color: var(--brandPrimary)!important;
            border-radius: var(--radiusL)!important;
            transition: all 0.25s ease-in-out;
            border: var(--borderSize) var(--borderStyle) var(--brandPrimary)!important;
            }    
        }

}
#createBtn{
    position: fixed;
    bottom: calc(8vh + 1.5rem + .5rem);
    right: 2.5vw;
    background: var(--brandPrimary);
    color: var(--txtLight);
    box-shadow: 0px 0px 37px 1px rgba(0,0,0,0.42);
    border-radius: var(--radiusS);
    outline: none;
    border: none;
    padding: 1rem 1.5rem;
    transition: all .35s ease-in-out;
    &:hover{
        background-color: transparent!important;
        padding: 1rem 1.5rem!important;
        color: var(--brandPrimary)!important;
        border-radius: var(--radiusL)!important;
        transition: all 0.25s ease-in-out;
        border: var(--borderSize) var(--borderStyle) var(--brandPrimary)!important;
    }
}
</style>