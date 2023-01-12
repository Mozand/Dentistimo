<template>
    <div> 
        <b-container>
         <b-card  title="Your Profile information">
              <b-row no-gutters>
<b-col md="6">
    <b-card-text >
        Username: {{this.user.username}}
 </b-card-text>
        <b-card-text > firstname:  {{this.user.firstName}} </b-card-text>   
        <b-card-text> lastname:  {{this.user.lastName}} </b-card-text>  
        </b-col > 
        </b-row >
  </b-card>
        </b-container>
  
    </div>
    

</template>

<script>
export default {
    data()
    { return {

        user:  {
        username : this.$store.state.username,
        firstName : this.$store.state.firstname,
        lastName: this.$store.state.lastname,
        }
    }



    },
mounted (){
    console.log(this.user)

}
}
</script>
<style >
div.container{
    margin-top: 10px;
}
</style>