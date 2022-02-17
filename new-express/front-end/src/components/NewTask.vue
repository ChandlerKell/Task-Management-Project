<template>
  <v-dialog v-model="dialog" persistent max-width="1024px" width="90%" :retain-focus="false">
    <v-card>
      <v-card-title>
        <span class="headline mb-4">New Task</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form v-model="valid">
            <v-row>
              <v-col cols="12">
                <p class="pb-0 mb-1">Title</p>
                <v-text-field
                  filled
                  v-model="task.title"
                  label="Enter a short title"
                  :rules="rules.required"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <p class="pb-0 mb-1">Summary</p>
                <v-text-field
                  filled
                  v-model="task.summary"
                  label="Enter a brief summary"
                  :rules="rules.required"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <p class="pb-0 mb-1">description</p>
                <v-text-field
                  filled
                  v-model="task.description"
                  label="Enter a full description"
                  :rules="rules.required"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <p class="pb-0 mb-1">Status</p>
                <v-autocomplete
                    no-data-text="There Exists no Statuses"
                    filled
                    :items="statuses"
                    item-text="name"
                    v-model="task.status"
                    label="Related Stores"
                    required
                  ></v-autocomplete>
                </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <p class="pb-0 mb-1">User</p>
                <v-autocomplete
                    no-data-text="There Exists no Users"
                    filled
                    :items="users"
                    item-text="name"
                    item-value="id"
                    v-model="task.userId"
                    label="Related Stores"
                    required
                  ></v-autocomplete>
                </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <p class="pb-0 mb-1">Project</p>
                <v-autocomplete
                    no-data-text="There Exists no Projects"
                    filled
                    :items="projects"
                    item-text="name"
                    item-value="id"
                    v-model="task.projectId"
                    label="Related Stores"
                    required
                  ></v-autocomplete>
                </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions class="pb-12">
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="success" @click="create" :disabled="!valid">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
    import axios from "axios";
  export default {
    name: "NewTask",
    components: {  },
    props: ["dialog"],
    data() {
      return {
        valid: false,
        rules: {
          required: [(value) => !!value || "Required"],
        },
        task: {
            title: "", 
            summary: "", 
            description: "",
            status: "",
            userId: "",
            projectId: "",
        },
        projects: [],
        statuses: [
            "Not Started",
            "In Progress",
            "In QA",
            "Completed",
        ],
        users: [],
      };
    },
    async created() {
      await this.getInitialData();
    },
    methods: {
        async getInitialData() {
            this.projects = await axios.get("http://host.docker.internal:8001/projects").then((res) => res.data);    
            this.users = await axios.get("http://host.docker.internal:8001/users").then((res) => res.data);
        },
        closeDialog() {
            this.$emit("close");
        },
        async create() {
            await axios.post("http://host.docker.internal:8001/tasks", this.task)
              .then(() => {
                console.log("Tech notification is successfully created.");

                this.$emit("refresh");

                this.closeDialog();
              })
              .catch((error) => {
                console.log(error);
              }); //change
        },
    },
  };
</script>
