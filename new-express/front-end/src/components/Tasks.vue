<template>
  <v-container>
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
                    <template v-slot:item.title="{ item }">
                        <p class="text-lg">
                            {{ item.title }}
                        </p>
                    </template>
                    <template v-slot:item.project.id="{ item }">
                        <p class="text-lg">
                            {{ item.project.name }}
                        </p>
                    </template>
                    <template v-slot:item.user.id="{ item }">
                        <p class="text-lg">
                            {{ item.user.name }}
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
                </v-data-table>
            </v-row>
            <new-task
                v-if="newTaskDialogue"
                :dialog="newTaskDialogue"
                @close="newTaskDialogue = false"
                @refresh="getInitialData"
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
            { text: "Task Title", value: "title", width: "20%", class: "text-xl" },
            { text: "Project Id", value: "projectId", width: "10%" },
            { text: "Assignee", value: "userId", width: "15%" },
            { text: "Summary", value: "summary", width: "15%" },
            { text: "Status", value: "status", width: "15%" },
            //description breakout
        ],
        newTaskDialogue: false, 
        tasks: [],
    }),
    methods: {
        async getInitialData() {
            this.tasks = await axios.get("http://host.docker.internal:8001/tasks").then((res) => res.data);    
        },
        async deleteTask(task) {
            await axios.delete("http://host.docker.internal:8001/tasks", task);    
            await this.getInitialData();
        },
    },
  }
</script>
