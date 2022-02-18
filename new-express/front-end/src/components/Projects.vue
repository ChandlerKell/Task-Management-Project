<template>
  <v-container >
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
                    <template v-slot:item.User="{ item }">
                        <p class="text-lg">
                            {{ item.User.name }}
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
                    <template v-slot:item.actions="{ item }">
                        <v-btn icon @click="editItem(item)">
                            Edit
                        </v-btn>
                        <br>
                        <v-btn icon color="error" @click="deleteItem(item)">
                            Delete
                        </v-btn>
                    </template>
                </v-data-table>
            </v-row>
            <new-project
                v-if="newProjectDialogue"
                :dialog="newProjectDialogue"
                @close="newProjectDialogue = false"
                @refresh="getInitialData"
                :currentProject="currentProject"
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
            { text: "Assignee", value: "User", width: "15%" },
            { text: "Description", value: "description", width: "15%" },
            { text: "Status", value: "status", width: "15%" },
            { text: "", value: "actions" },
            //description breakout
        ],
        newProjectDialogue: false, 
        projects: [],
        currentProject: {
            id: "",
            name: "",
            description: "",
            status: "",
            userId: "",
        }, 
        //authenticated: this.$store.authenticated,
    }),
    async created() {
      await this.getInitialData();
    },
    methods: {
        async getInitialData() {
            this.projects = await axios.get("http://host.docker.internal:8001/projects").then((res) => res.data);
            console.log(this.projects)
        },
        async deleteItem(item) {
            await axios.delete(`http://host.docker.internal:8001/projects/${ item.id}`)
            await this.getInitialData();
        },
        editItem(item) {
            this.currentProject.id = item.id;
            this.currentProject.name = item.name;
            this.currentProject.description = item.description;
            this.currentProject.status = item.status;
            this.currentProject.userId = item.userId;

            this.newProjectDialogue = true;
        },
    },
  }
</script>
