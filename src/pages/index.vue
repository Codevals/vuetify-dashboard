<template>
  <v-app>
    <!-- Top bar -->
    <v-app-bar class="px-3" color="cyan-lighten-5" flat density="compact" >
      <v-spacer></v-spacer>
      <v-tabs v-model="selectedTab" centered color="grey-darken-1">
        <v-tab v-for="link in links" :key="link">
          {{ link }}
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
    </v-app-bar>
    <!-- Container -->
    <v-main>
      <v-container fluid>
        <v-row>
          <!-- Left col -->
          <v-col cols="12" sm="2"></v-col>
          <!-- Main col -->
          <v-col cols="12" sm="8">
            <v-sheet 
              v-if="selectedTab==0"
              min-height="70vh"
              rounded="lg"
              class="pa-4"
            >
              <h2 class="mt-4"> App-List: </h2>
              <v-data-table
                v-if="groupData"
                :items="groupData"
                :headers="headers"
                item-value="app"
                v-model:expanded="expanded"
                show-expand
              >
                <template v-slot:header.app="{ column }" >
                  {{ column.title?.toUpperCase() }}
                </template>
              </v-data-table>
            </v-sheet>
            <v-sheet 
              v-else
              min-height="70vh"
              rounded="lg"
              class="pa-4"
            >
              About
            </v-sheet>
          </v-col>
          <!-- Right col -->
          <v-col cols="12" sm="2"></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //import
  import { ref, onMounted, watch } from "vue"
  import useGroupApps from "../functions/useGroupApps"

  //variables
  let selectedTab = ref (0)
  const links = ref(["Dashboard", "About"])
  let apiResult = ref()
  let groupData = ref([])
  let expanded = ref([])

  const headers = ref([
    { title: "App",  key:"app" },
    { title: "US",  key:"totalRevenueUS" },
    { title: "UK",  key:"totalRevenueUK" },
    { title: "FR",  key:"totalRevenueFR" },
    { title: "JP",  key:"totalRevenueJP" },
    { title: "CN",  key:"totalRevenueCN" },
    { title: "Total",  key:"totalRevenue" },
    { title: "",  key:"data-table-expand" },
  ])

  //Vue lifeCycle
  onMounted(async () => {
    fetchMonetizationApi()
  })

  //Function: Watcher
  watch(apiResult, (newValue)=>{
    groupData.value = useGroupApps(newValue.data)
  })

  //API
  const fetchMonetizationApi = async () => {
    fetch("https://www.anthony-cardinale.fr/_placeholder/monetization-api.json")
    .then(response => response.json())
    .then(data => apiResult.value = data)
  }
  /**ou mieux
   * const fetchMonetizationApi = async () => {
    try {
        const response = await fetch("https://www.anthony-cardinale.fr/_placeholder/monetization-api.json");
        const data = await response.json();
        apiResult.value = data;
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        }
    };

   */

</script>
