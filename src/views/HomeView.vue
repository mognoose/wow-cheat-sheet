<template>
  <div>
    <Header />
    <div class="home">
      <div class="cheatsheet-list card mt-4">
        <table>
          <thead>
            <tr>
              <th scope="col">Class</th>
              <th scope="col">Spec</th>
              <th scope="col">By</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cs in cheatsheets" :key="cs.id" @click="onView(cs.id)">
              <td>{{ cs.Class }}</td>
              <td>{{ cs.Spec }}</td>
              <td>{{ cs.createdBy }}</td>
              <!-- <td>
            <pre>{{ cs }}</pre>
          </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { useLoadCheatsheets } from "@/firebase";

export default {
  name: "HomeView",
  components: {
    Header,
  },
  setup() {
    const cheatsheets = useLoadCheatsheets();
    return { cheatsheets };
  },
  methods: {
    async onView(id) {
      this.$router.push(`/id/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  row-gap: 2em;
  background-color: rgba(55, 55, 55, 0);
  padding: 3em;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 3em 0;
  }
}

.cheatsheet-list {
  justify-self: center;
  grid-column: 2;
  backdrop-filter: blur(20px);
  @media only screen and (max-width: 600px) {
    grid-column: 1;
  }
}
tbody tr:hover {
  cursor: pointer;
  background-color: rgba(55, 55, 55, 0.5);
}
</style>
