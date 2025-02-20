<template>
  <div>
    <div class="wrapper">
      <div ref="spot1" class="spot1"></div>
      <div ref="spot2" class="spot2"></div>
      <div ref="spot3" class="spot3"></div>
    </div>
    <main>
      <section class="page-container">
        <div class="left-content">
          <div class="me">
            <div class="me-container">
              <img
                src="https://avatars.githubusercontent.com/u/183945322?v=4"
                alt="Image"
              />
              <div class="me-title">
                <h1>Benoit DUMONT</h1>
                <p>Développeur Web T-Shaped</p>
              </div>
            </div>
            <div class="me-socials">
              <ul>
                <li>
                  <div class="socials-linkedin">
                    <PhosphorIconLinkedinLogo
                      :size="32"
                      color="#466fff"
                      weight="fill"
                      class="icon"
                    />

                    <NuxtLink
                      to="https://www.linkedin.com/in/benoit-dumont/"
                      external
                      target="_blank"
                      ><span>Benoit DUMONT</span>
                      <PhosphorIconArrowSquareOut
                        :size="24"
                        color="#466fff"
                        weight="fill"
                        class="icon"
                    /></NuxtLink>
                  </div>
                </li>
                <li>
                  <div class="socials-mail">
                    <PhosphorIconEnvelope
                      :size="32"
                      color="#466fff"
                      weight="regular"
                      class="icon"
                    />
                    <NuxtLink to="mailto:contact@dumont-benoit.fr">
                      <span>Mail</span>
                      <PhosphorIconArrowSquareOut
                        :size="24"
                        color="#466fff"
                        weight="fill"
                        class="icon"
                    /></NuxtLink>
                  </div>
                </li>
                <li>
                  <div class="socials-github">
                    <PhosphorIconGithubLogo
                      :size="32"
                      color="#466fff"
                      weight="regular"
                      class="icon"
                    />
                    <NuxtLink
                      to="https://github.com/benoit-dumont"
                      external
                      target="_blank"
                    >
                      <span>Github</span>

                      <PhosphorIconArrowSquareOut
                        :size="24"
                        color="#466fff"
                        weight="fill"
                        class="icon"
                    /></NuxtLink>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="about-me">
            <p>
              Depuis toujours passionné par l'informatique, j'ai découvert l'art
              du développement web, où je peux exprimer ma créativité tout en
              créant des solutions utiles au quotidien. J'adore échanger
              directement plutôt que de passer par des lettres de motivation et
              des CV. Ce portfolio présente les grandes lignes de mon travail,
              mais il y a bien plus à découvrir. Si vous souhaitez en savoir
              plus sur mes projets ou discuter de potentielles collaborations,
              n'hésitez pas à me contacter. <br />Je serais ravi d'échanger avec
              vous !
            </p>
            <div class="dl-button">
              <a
                href="pdf/cv.pdf"
                download="CV_Benoit_DUMONT.pdf"
                _target="blank"
              >
                <span type="button">Télécharger le CV</span>
                <PhosphorIconBriefcase
                  :size="32"
                  color="#fff"
                  weight="fill"
                  class="icon"
                />
              </a>
            </div>
          </div>
        </div>
        <nav class="summary-out">
          <ul>
            <li>
              <div
                class="anchor-history"
                tabindex="0"
                @click="toggleAnchors('History')"
              >
                <PhosphorIconBriefcase
                  :size="32"
                  color="#fff"
                  weight="fill"
                  class="icon"
                />
                <span>Expérience</span>
              </div>
            </li>
            <li>
              <div
                class="anchor-study"
                tabindex="0"
                @click="toggleAnchors('Study')"
              >
                <PhosphorIconGraduationCap
                  :size="32"
                  color="#fff"
                  weight="fill"
                  class="icon"
                />
                <span>Diplômes</span>
              </div>
            </li>
            <li>
              <div
                class="anchor-skills"
                tabindex="0"
                tabbable="true"
                @click="toggleAnchors('Skills')"
              >
                <PhosphorIconBrain
                  :size="32"
                  color="#fff"
                  weight="fill"
                  class="icon"
                />
                <span>Compétences</span>
              </div>
            </li>
          </ul>
        </nav>
        <div class="right-content">
          <nav class="summary">
            <ul>
              <li>
                <div
                  class="anchor-history"
                  tabindex="0"
                  @click="toggleAnchors('History')"
                >
                  <PhosphorIconBriefcase
                    :size="32"
                    color="#fff"
                    weight="fill"
                    class="icon"
                  />
                  <span>Expérience</span>
                </div>
              </li>
              <li>
                <div
                  class="anchor-study"
                  tabindex="0"
                  @click="toggleAnchors('Study')"
                >
                  <PhosphorIconGraduationCap
                    :size="32"
                    color="#fff"
                    weight="fill"
                    class="icon"
                  />
                  <span>Diplômes</span>
                </div>
              </li>
              <li>
                <div
                  class="anchor-skills"
                  tabindex="0"
                  @click="toggleAnchors('Skills')"
                >
                  <PhosphorIconBrain
                    :size="32"
                    color="#fff"
                    weight="fill"
                    class="icon"
                  />
                  <span>Compétences</span>
                </div>
              </li>
            </ul>
          </nav>
          <section v-if="history" class="history">
            <h1>Expérience</h1>
            <WorkHistoryComponent />
          </section>
          <section v-if="study" class="study">
            <h1>Diplômes</h1>
            <StudyComponent />
          </section>
          <section v-if="skills" class="skills">
            <h1>Compétences</h1>
            <SkillsComponent />
          </section>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
const spot1 = ref(null);
const spot2 = ref(null);
const spot3 = ref(null);
const history = ref(true);
const study = ref(false);
const skills = ref(false);
const initialMouse = ref({ x: null, y: null });

function getInitialMouseLocation() {
  initialMouse.value.x = window.innerWidth / 2;
  initialMouse.value.y = window.innerHeight / 2;
}

function updateParallax(event) {
  const { clientX: mouseX, clientY: mouseY } = event;
  const deltaX = mouseX - initialMouse.value.x;
  const deltaY = mouseY - initialMouse.value.y;
  spot1.value.style.translate = `${deltaX * 0.025}px ${deltaY * 0.025}px`;
  spot2.value.style.translate = `${deltaX * 0.05}px ${deltaY * 0.05}px`;
  spot3.value.style.translate = `${deltaX * 0.05}px ${deltaY * 0.05}px`;
}

function setupParallaxEvent() {
  document.addEventListener('mousemove', updateParallax);
}

function toggleAnchors(anchor) {
  // eslint-disable-next-line default-case
  switch (anchor) {
    case 'History':
      study.value = false;
      skills.value = false;
      history.value = true;
      break;
    case 'Study':
      history.value = false;
      skills.value = false;
      study.value = true;
      break;
    case 'Skills':
      history.value = false;
      study.value = false;
      skills.value = true;
      break;
  }
}

onMounted(() => {
  getInitialMouseLocation();
  setupParallaxEvent();
});
</script>

<style scoped>
a {
  text-decoration: none;
  color: #fdfdfe;
}

body {
  margin: 0;
}

.wrapper {
  z-index: -1;
  inset: 0;
  position: fixed;
  background-color: #101636;
  overflow: hidden;
}

.spot1 {
  background: radial-gradient(
    circle,
    rgb(70, 111, 255, 0.2) 0%,
    rgba(39, 40, 88, 0) 70%,
    rgba(39, 40, 88, 0) 100%
  );
  height: 700px;
  width: 700px;
  position: absolute;
  right: 0;
  top: 20%;
  transform: translateX(30%);
}

.spot2 {
  background: radial-gradient(
    circle,
    rgb(70, 111, 255, 0.2) 0%,
    rgba(39, 40, 88, 0) 70%,
    rgba(39, 40, 88, 0) 100%
  );
  height: 300px;
  width: 300px;
  position: absolute;
  left: 0;
  top: 10%;
  transform: translateX(-50%);
}

.spot3 {
  background: radial-gradient(
    circle,
    rgb(188, 70, 239, 0.3) 0%,
    rgba(39, 40, 88, 0) 70%,
    rgba(39, 40, 88, 0) 100%
  );
  height: 300px;
  width: 300px;
  position: absolute;
  right: 0;
  top: 20%;
  transform: translateX(50%);
}

main {
  height: 80vh;
  width: 80vw;
}

.page-container {
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100%;
}

.left-content {
  flex: 0.6 1;
}

.me {
  backdrop-filter: blur(20px);
  background-color: rgba(73, 73, 73, 0.1);
  border-radius: 20px;
  padding: 2em;
  font-weight: 300;
}

.me img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid #466fff;
}

.me-container {
  display: flex;
  align-items: center;
  gap: 40px;
  color: #fdfdfe;
}

.me-container h1 {
  font-size: 1.5em;
}

.me-container p {
  font-size: 1.2em;
}

.me-socials ul {
  list-style: none;
  padding: 0;
}

.me-socials span {
  color: #fdfdfe;
}

.about-me {
  color: #fdfdfe;
}

.about-me p {
  padding-left: 5%;
}

.dl-button {
  text-align: center;
  padding: 1em 2em;
}

.dl-button a {
  border-radius: 30px;
  color: #fdfdfe;
  cursor: pointer;
  padding: 1em 1.5em;
  background-color: #456efd;
  gap: 0.5em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.socials-linkedin,
.socials-mail,
.socials-github {
  display: flex;
  align-items: center;
  gap: 10px;
}

.socials-linkedin a,
.socials-mail a,
.socials-github a {
  display: flex;
  align-items: center;
  gap: 10px;
}

.right-content {
  flex: 1 1;
  backdrop-filter: blur(20px);
  background-color: rgba(73, 73, 73, 0.1);
  border-radius: 20px;
  padding: 2em;
  display: flex;
  flex-direction: column;
}

.summary-out {
  display: none;
}

.summary ul,
.summary-out ul {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
}

.history {
  overflow-y: scroll;
}

.anchor-history,
.anchor-study,
.anchor-skills {
  display: inline-flex;
  padding: 5px 10px;
  align-items: center;
  color: #fdfdfe;
  gap: 15px;
  border: 2px solid #466fff;
  border-radius: 10px;
  transition: all 200ms ease-in-out;
  cursor: pointer;
}

.anchor-history:hover,
.anchor-study:hover,
.anchor-skills:hover {
  background-color: #466fff;
}

.skills {
  display: flex;
  flex-direction: column;
  height: 0;
  flex: 1 0 0;
}

.history h1,
.study h1,
.skills h1 {
  font-size: 1.8em;
  color: #fdfdfe;
}

::-webkit-scrollbar {
  width: 10px;
  background-color: rgba(73, 73, 73, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #6d6d6d;
}

@media screen and (max-width: 1200px) {
  .page-container {
    flex-direction: column;
  }
  .me {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .about-me p {
    padding-left: initial;
  }

  .right-content {
    align-items: center;
  }

  .history {
    padding: 0 3em;
    overflow-y: initial;
  }

  .skills {
    height: initial;
  }

  .summary {
    display: none;
  }

  .summary-out {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
    left: 0;
    right: 0;
  }
}

@media screen and (max-width: 800px) {
  .page-container {
    position: relative;
  }

  .history {
    padding: 0;
  }

  .summary {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .summary ul {
    justify-content: space-evenly;
  }

  .anchor-history span,
  .anchor-skills span,
  .anchor-study span {
    display: none;
  }
}

@media screen and (max-width: 400px) {
  .me-container {
    flex-direction: column;
    gap: initial;
  }

  .me-title {
    text-align: center;
  }
}
</style>
