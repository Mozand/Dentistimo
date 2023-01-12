<template>
    <div>
   <Navbar/>      
    <Map/>
    </div>
</template>

<script>
import Map from '../components/Map.vue'
import Navbar from '../components/Navbar.vue'
export default {
    components: { Map ,Navbar},

    data() {
        return {

        }
    }
}
</script>

