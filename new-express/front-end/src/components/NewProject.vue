<template>
  <v-dialog v-model="dialog" persistent max-width="1024px" width="90%" :retain-focus="false">
    <v-card>
      <v-card-title>
        <span class="headline mb-4">New Project</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form v-model="valid">
            <v-row>
              <v-col cols="12">
                <p class="pb-0 mb-1">Name</p>
                <v-text-field
                  filled
                  v-model="project.name"
                  label="Enter a short title"
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
                  v-model="project.description"
                  label="Enter a full description"
                  :rules="rules.required"
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <p class="pb-0 mb-1">Status</p>
                <v-select
                    no-data-text="There Exists no Statuses"
                    filled
                    :items="statuses"
                    item-text="name"
                    v-model="project.status"
                    label="Select a Status"
                    required
                  ></v-select>
                </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <p class="pb-0 mb-1">Assignee</p>
                <v-select
                    no-data-text="There Exists no Users"
                    filled
                    :items="users"
                    item-text="name"
                    item-value="id"
                    v-model="project.userId"
                    label="Assign a User"
                    required
                  ></v-select>
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
    name: "NewProject",
    components: {  },
    props: ["dialog"],
    data() {
      return {
        valid: false,
        rules: {
          required: [(value) => !!value || "Required"],
        },
        project: {
            name: "",
            description: "",
            status: "",
            userId: "",
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
            this.users = await axios.get("http://host.docker.internal:8001/users").then((res) => res.data);
        },
        closeDialog() {
            this.$emit("close");
        },
        async create() {
           await axios.post("http://host.docker.internal:8001/projects", this.project)
              .then(() => {
                console.log("Tech notification is successfully created.");

                this.$emit("refresh");

                this.closeDialog();
              })
              .catch((error) => {
                console.log(error);
              });
        },
    },
  };
</script>
