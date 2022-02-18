<template>
  <v-container >
      <v-row class="text-center ml-auto mr-auto">
        <v-col>
            <v-row>
                <v-btn @click="newTaskDialogue = true">Create Task</v-btn>
            </v-row>
            <br>
            <br>
            <v-row>
                <v-data-table
                    flat
                    :headers="headers"
                    :items="tasks"
                    class="elevation-0 report-table w-100"
                >
                    <template v-slot:header.text="{ header }">
                        <p class="text-xl">
                            {{ header.text }}
                        </p>
                    </template>
                    <template v-slot:item.id="{ item }">
                        <p class="text-lg">
                            {{ item.id }}
                        </p>
                    </template>
                    <template v-slot:item.title="{ item }">
                        <p class="text-lg">
                            {{ item.title }}
                        </p>
                    </template>
                    <template v-slot:item.Project="{ item }">
                        <p class="text-lg">
                            {{ item.Project.name }}
                        </p>
                    </template>
                    <template v-slot:item.User="{ item }">
                        <p class="text-lg">
                            {{ item.User.name }}
                        </p>
                    </template>
                    <template v-slot:item.summary="{ item }">
                        <p class="text-lg">
                            {{ item.summary }}
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
            <new-task
                v-if="newTaskDialogue"
                :dialog="newTaskDialogue"
                @close="newTaskDialogue = false"
                @refresh="getInitialData"
                :currentTask="currentTask"
            ></new-task>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewTask from "./NewTask";
import axios from "axios";

  export default {
    name: 'Tasks',
    components: { NewTask },
    data: () => ({
        headers: [
            { text: "Task Id", value: "id", width: "10%" },
            { text: "Task Title", value: "title", width: "20%", class: "text-xl" },
            { text: "Project Id", value: "Project", width: "10%" },
            { text: "Assignee", value: "User", width: "15%" },
            { text: "Summary", value: "summary", width: "15%" },
            { text: "Status", value: "status", width: "15%" },
            { text: "", value: "actions" },
            //description breakout
        ],
        newTaskDialogue: false, 
        tasks: [],
        currentTask: {
            id: "",
            title: "",
            summary: "",
            description: "",
            status: "",
            userId: "",
            projectId: "",
        }, 
        //authenticated: this.$store.authenticated, 
    }),
    async created() {
      await this.getInitialData();
    },
    methods: {
        async getInitialData() {
            this.tasks = await axios.get("http://host.docker.internal:8001/tasks").then((res) => res.data);    
        },
        async deleteItem(item) {
            await axios.delete(`http://host.docker.internal:8001/tasks/${ item.id}`);    
            await this.getInitialData();
        },
        editItem(item) {
            this.currentTask.id = item.id;
            this.currentTask.title = item.title;
            this.currentTask.summary = item.summary;
            this.currentTask.description = item.description;
            this.currentTask.status = item.status;
            this.currentTask.userId = item.userId;
            this.currentTask.projectId = item.projectId;

            this.newTaskDialogue = true;
        },
    },
  }
</script>
