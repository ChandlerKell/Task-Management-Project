<template>
  <v-container>
    <v-row class="text-center ml-auto mr-auto">
        <v-col>
            <v-row>
                <v-btn @click="newProjectDialogue = true">Create Project</v-btn>
            </v-row>
            <br>
            <br>
            <v-row>
                <v-data-table
                    flat
                    :headers="headers"
                    :items="projects"
                    class="elevation-0 report-table w-100"
                >
                    <template v-slot:header.text="{ header }">
                        <p class="text-xl">
                            {{ header.text }}
                        </p>
                    </template>
                    <template v-slot:item.name="{ item }">
                        <p class="text-lg">
                            {{ item.name }}
                        </p>
                    </template>
                    <template v-slot:item.user.id="{ item }">
                        <p class="text-lg">
                            {{ item.user.id }}
                        </p>
                    </template>
                    <template v-slot:item.description="{ item }">
                        <p class="text-lg">
                            {{ item.description }}
                        </p>
                    </template>
                    <template v-slot:item.status="{ item }">
                        <p class="text-lg">
                            {{ item.status }}
                        </p>
                    </template>
                </v-data-table>
            </v-row>
            <new-project
                v-if="newProjectDialogue"
                :dialog="newProjectDialogue"
                @close="newProjectDialogue = false"
                @refresh="getInitialData"
            ></new-project>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewProject from "./NewProject";
import axios from "axios";
  export default {
    name: 'Projects',
    components: { NewProject },
    data: () => ({
        headers: [
            { text: "Project Title", value: "name", width: "20%", class: "text-xl" },
            { text: "Assignee", value: "userId", width: "15%" },
            { text: "Description", value: "description", width: "15%" },
            { text: "Status", value: "status", width: "15%" },
            //description breakout
        ],
        newProjectDialogue: false, 
        projects: [],
    }),
    async created() {
      await this.getInitialData();
    },
    methods: {
        async getInitialData() {
            this.projects = await axios.get("http://host.docker.internal:8001/projects").then((res) => res.data);
            console.log(this.projects)
        },
    },
  }
</script>
