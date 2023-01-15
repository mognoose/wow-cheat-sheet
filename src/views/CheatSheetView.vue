<template>
  <div class="container" :style="cssProps">
    <h1>
      {{ `${cheatsheet.Class} ${cheatsheet.Spec} by ${cheatsheet.createdBy}` }}
    </h1>
    <!-- <span
      data-tooltip-href="http://www.wowdb.com/spells/117906-mastery-elusive-brawler"
      >TEST</span
    > -->
    <div class="home">
      <div class="section">
        <div class="inner-section">
          <h2>Rotation</h2>
          <ol>
            <li v-for="(skill, i) in cheatsheet.Rotation" :key="i">
              <img :src="iconSource + skill.icon + '.jpg'" />
              <span>{{ skill.name ? skill.name : skill }}</span>
            </li>
          </ol>
        </div>
      </div>

      <div class="section">
        <div class="inner-section">
          <h2>Stat Priority</h2>
          <ol>
            <li v-for="(stat, i) in cheatsheet.StatPrio" :key="i">
              {{ stat }}
            </li>
          </ol>
        </div>
        <div class="inner-section">
          <h2>Consumables</h2>
          <ol>
            <li v-for="(consumable, i) in cheatsheet.Consumables" :key="i">
              {{ consumable }}
            </li>
          </ol>
        </div>
        <div class="inner-section">
          <h2>Enchants</h2>
          <div class="enchants" v-for="(enchant, i) in cheatsheet.Enchants" :key="i">
              <strong>{{i}}</strong>
              {{enchant}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { getCheatSheetByCode } from "@/firebase";

export default {
  name: "HomeView",
  components: {
    Header,
  },
  data() {
    return {
      iconSource: "https://wow.zamimg.com/images/wow/icons/large/",
      cheatsheet: [],
      cssProps: {
        minHeight: "100vh",
        backgroundSize: `cover`,
        backgroundPosition: `center`,
        backgroundAttachment: "fixed",
      },
    };
  },
  mounted() {
    this.getCheatSheet();
  },
  methods: {
    async getCheatSheet() {
      this.cheatsheet = await getCheatSheetByCode(this.$route.params.id);
      this.cssProps.backgroundImage = `url(${require("@/assets/" +
        this.cheatsheet.Class.replaceAll(/\s/g, "") +
        ".jpg")})`;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  padding-top: 3em;
}
.home {
  display: grid;
  grid-template-columns: 1fr 2fr 4fr 2fr 1fr;
  row-gap: 2em;
  background-color: rgba(55, 55, 55, 0);
  padding-top: 3em;
  margin: 0em;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 3em 0;
  }
  text-align: left;
}

.cheatsheet {
  justify-self: center;
  grid-column: 2;
  @media only screen and (max-width: 600px) {
    grid-column: 1;
  }
}

.inner-section {
  border: 1px solid #fff;
  border-radius: 4px;
  margin: 1em;
  padding: 0.5em 2em;
  background-color: rgba(55, 55, 55, 0);
  backdrop-filter: blur(10px);

  ol {
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    margin: 0.5em;
    margin-left: 0;
    img {
      margin-right: 0.5em;
      height: 40px;
      border-radius: 4px;
    }
  }

  a:link,
  a:visited,
  a:active,
  a:hover {
    color: #fff;
    text-decoration: none;
  }
}
.section:nth-child(1) {
  grid-column-start: 2;
}
.section:nth-child(2) {
  grid-column-start: 4;
}

.enchants {
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin: 1em 0;
  padding-bottom: 1em;
  border-bottom: 1px solid #fff;
}

.enchant-icon {
  width: 60px;
}
</style>
